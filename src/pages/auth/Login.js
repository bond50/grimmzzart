import React, {useCallback, useEffect, useState} from 'react';
import {clearMessage} from "../../redux/slices/message";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {MDBBtn, MDBInput, MDBSpinner} from "mdb-react-ui-kit";
import {login, verify2FA} from "../../redux/slices/auth";
import Swal from "sweetalert2";
import {loginFormInitialValues} from "../../common/initialValues/loginForm";
import useForm from "../../hooks/useForm";
import Form from "../../components/Form";
import {unwrapResult} from "@reduxjs/toolkit";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const {isLoggedIn, user} = useSelector((state) => state.auth);
    const [show2FA, setShow2FA] = useState(false);
    const [userId, setUserId] = useState('');
    const [qrCode, setQRCode] = useState(null);
    const [token2FA, setToken2FA] = useState('');
    const [hasLoggedInBefore, setHasLoggedInBefore] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);

    const [form, setForm] = useState(loginFormInitialValues.loginForm);

    const [formIsValid, setFormIsValid] = useState(false);
    const handleChange = useForm(setForm, setFormIsValid);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const navigateBasedOnRole = useCallback((role) => {
        if (role.code === 1000) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        if (user && user.token && user.role && user.role.code) {
            navigateBasedOnRole(user.role);
        }
    }, [user, navigate, navigateBasedOnRole]);

    const fireAlert = (text, icon, callback) => {
        Swal.fire({
            text,
            icon,
        }).then(callback).catch(error => {
            dispatch(clearMessage())
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = {};
        for (let formElementIdentifier in form) {
            formData[formElementIdentifier] = form[formElementIdentifier].value;
        }
        try {
            const res = await dispatch(login(formData));
            const result = unwrapResult(res);
            if (result.qrCode) {
                setQRCode(result.qrCode);
                setUserId(result.userId);
                setShow2FA(true);
                setShowLoginForm(false); // Hide the login form
            }
            if (result.hasLoggedInBefore) {
                setHasLoggedInBefore(true);
                setUserId(result.userId);
                setShowLoginForm(false); // Hide the login form
            }
        } catch (error) {
            console.error("Login error:", error);
            if (show2FA || hasLoggedInBefore) {
                // If the error is due to OTP, we keep the OTP input displayed
                fireAlert(error, "error", null);
            }
        }
        setLoading(false);
    };

    const handle2FAVerification = async () => {
        setLoading(true);
        try {
            const res = await dispatch(verify2FA({userId: userId, authenticatorToken: token2FA}));
            unwrapResult(res);
            fireAlert('Operation completed successfully', 'success', () => navigate('/'));
        } catch (error) {
            console.error("2FA verification error:", error);
        }
        setLoading(false);
    };

    const signupForm = () => (
        <form className='row g-3' onSubmit={handleSubmit}>
            <Form form={form} handleChange={handleChange}>
                <div className='col-12'>
                    <MDBBtn
                        type='submit'
                        className='btn btn-primary  w-100'
                        disabled={loading || !formIsValid}>
                        {loading ? <>
                            <MDBSpinner size='sm' role='status' tag='span' className='me-2'/>
                            Loading...
                        </> : 'Login'}
                    </MDBBtn>
                </div>
            </Form>
        </form>
    );

    if (isLoggedIn) {
        return <Navigate replace to="/"/>
    } else if (show2FA) {
        return (
            <>
                <div className="">
                    <h5 className="card-title text-center pb-0 fs-4">Secure Your Account</h5>
                    <p className="text-center ">Scan the QR Code below using your preferred authenticator app and then
                        enter the provided one-time code below.</p>
                </div>
                <div className="text-center card-body my-2 pb-2">
                    <img src={qrCode} alt="QR Code"/>
                </div>
                <div className="text-center card-footer">
                    <p>THEN</p>
                    <MDBInput
                        type="text"
                        value={token2FA}
                        label='Enter your one time code'
                        onChange={(e) => setToken2FA(e.target.value)}/>
                </div>
                <div className="text-center">
                    <MDBBtn onClick={handle2FAVerification}>Verify</MDBBtn>
                </div>
            </>
        );
    } else if (hasLoggedInBefore) {
        return <div className="pt-4 pb-2">
            <div className="text-center">
                <h5 className="card-title text-center pb-0 fs-4">Verify Your Identity</h5>
                <p className="text-center">Check your preferred one-time password application for a code..</p>
                <MDBInput
                    type="text"
                    value={token2FA}

                    label='Enter your one time code'
                    onChange={(e) => setToken2FA(e.target.value)}/>
                <div className="text-center mt-3">
                    <MDBBtn disabled={!token2FA} className='btn btn-block'
                            onClick={handle2FAVerification}>Verify</MDBBtn>
                </div>
            </div>
        </div>

    } else if (showLoginForm) {
        return (
            <>
                <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    <p className="text-center ">Enter your email & password to login</p>
                </div>
                {signupForm()}
            </>
        );
    }
}

export default Login;
