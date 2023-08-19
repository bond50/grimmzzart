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

    const [form, setForm] = useState(loginFormInitialValues.loginForm);

    const [formIsValid, setFormIsValid] = useState(false);
    const handleChange = useForm(setForm, setFormIsValid);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    useEffect(() => {
        if (user && user.token && user.role && user.role.code === 1000) {
            navigate('/');
        }
    }, [user, navigate]);


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

            if (result.forcePasswordChange) {
                fireAlert(`${result.message}`, 'info', () => navigate('/change-password', {state: {userId: result.userId}}));
            }

            if (result.needVerification) {
                navigate('/otp-verification', {state: {userId: result.userId}})
            }

        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    };


    const signupForm = () => (
        <form className='row g-3' onSubmit={handleSubmit}>
            <Form form={form} handleChange={handleChange}>
                <div className='col-12'>
                    <MDBBtn
                        type='submit'
                        className='btn btn-primary w-100'
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
    } else {
        return <>
            <div className="pt-4 pb-2">
                <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                <p className="text-center ">Enter your email & password to login</p>
            </div>
            {signupForm()}
        </>
    }
}

export default Login;
