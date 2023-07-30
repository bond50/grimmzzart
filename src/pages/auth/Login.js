import React, {useCallback, useEffect, useState} from 'react';
import {clearMessage} from "../../redux/slices/message";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, Navigate, useNavigate} from "react-router-dom";
import {MDBBtn, MDBSpinner} from "mdb-react-ui-kit";
import {login} from "../../redux/slices/auth";
import Swal from "sweetalert2";
import {loginFormInitialValues} from "../../common/initialValues/loginForm";
import useForm from "../../hooks/useForm";
import Form from "../../components/Form";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const {isLoggedIn, user} = useSelector((state) => state.auth);

    const [formIsValid, setFormIsValid] = useState(false);
    const [form, setForm] = useState(loginFormInitialValues.loginForm);
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

        try {
            setLoading(true);
            const formData = {};
            for (let formElementIdentifier in form) {
                formData[formElementIdentifier] = form[formElementIdentifier].value;
            }

            const res = await dispatch(login(formData)).unwrap();
            if (res.error) {
                fireAlert(res.error, "error", null);
                setLoading(false);
            } else {
                if (res.user.role.active && res.user.role.code === 1000) {
                    fireAlert('Operation completed successfully', 'success', () => navigateBasedOnRole(res.user.role));
                } else {
                    fireAlert('Access denied', "error", null);
                }
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const InfoLink = ({link, text}) => (
        <p className="small mb-0">
            {text}
            <Link to={link}> {' '} Reset it here </Link>
        </p>
    );

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
                <InfoLink link="/auth/register" text="Don't have account? Create an account"/>
                <InfoLink link="/auth/password/forgot" text="Forgot password? Reset it here"/>
            </Form>
        </form>
    );

    if (isLoggedIn) {
        return <Navigate replace to="/"/>
    } else {
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
