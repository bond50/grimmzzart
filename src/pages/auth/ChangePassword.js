import React, {useCallback, useEffect, useState} from 'react';
import {clearMessage} from "../../redux/slices/message";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {MDBBtn, MDBInput, MDBSpinner} from "mdb-react-ui-kit";
import {changePassword} from "../../redux/slices/auth";

import {changePasswordFormInitialValues} from "../../common/initialValues/changePassword";
import useForm from "../../hooks/useForm";
import Form from "../../components/Form";
import {unwrapResult} from "@reduxjs/toolkit";
import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";
import {useLocation} from 'react-router-dom';
import Swal from "sweetalert2";

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(changePasswordFormInitialValues.passwordForm);
    const [passwordVisible, togglePasswordVisibility] = useTogglePasswordVisibility(form, setForm);
    const [formIsValid, setFormIsValid] = useState(false);
    const handleChange = useForm(setForm, setFormIsValid);

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const userId = location.state?.userId;


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = {};
        for (let formElementIdentifier in form) {
            formData[formElementIdentifier] = form[formElementIdentifier].value;
        }

        try {
            const res = await dispatch(changePassword({userId, data: formData}));
            const result = unwrapResult(res);
            console.log('RESULT', result)

            Swal.fire('Success', result.message, 'success').then(() => {
                navigate('/otp-verification', {
                    state: {
                        userId: result.userId,
                    }, replace: true
                });
            });

        } catch (error) {
            Swal.fire('Error', error.message, 'error');

        }
        setLoading(false);
    };

    const signupForm = () => (
        <form className='row g-3' onSubmit={handleSubmit}>
            <Form form={form}
                  togglePasswordVisibility={togglePasswordVisibility}
                  passwordVisible={passwordVisible}
                  handleChange={handleChange}>
                <div className='col-12'>
                    <MDBBtn
                        type='submit'
                        className='btn btn-primary  w-100'
                        disabled={loading || !formIsValid}>
                        {loading ? <>
                            <MDBSpinner size='sm' role='status' tag='span' className='me-2'/>
                            Loading...
                        </> : 'Change Password'}
                    </MDBBtn>
                </div>
            </Form>
        </form>
    );
    return (
        <>
            <div className="pt-4 pb-2">
                <h5 className="card-title text-center pb-0 fs-4">Change Your Password</h5>
                <p className="text-center ">Enter your email & password to login</p>
            </div>
            {signupForm()}
        </>
    );
}

export default ChangePassword;
