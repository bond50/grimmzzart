import React, {useEffect, useState} from 'react';
import {clearMessage} from "../../redux/slices/message";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {resetPassword} from "../../redux/slices/auth";
import useForm from "../../hooks/useForm";
import {resetPasswordFormInitialValues} from "../../common/initialValues/passwordReset";
import Form from "../../components/Form";
import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";


const PasswordResetForm = ({swal}) => {

    let {token} = useParams();
    const [formIsValid, setFormIsValid] = useState(false);
    const [form, setForm] = useState(resetPasswordFormInitialValues.passwordForm);

    const [passwordVisible, togglePasswordVisibility] = useTogglePasswordVisibility(form, setForm);

    const [loading, setLoading] = useState(false);
    const {message} = useSelector((state) => state.message);
    const {isLoggedIn, user} = useSelector((state) => state.auth);
    const location = useLocation();
    const [successful, setSuccessful] = useState(false);
    const [errored, setErrored] = useState(false)
    const [showForm, setShowForm] = useState(true)


    const dispatch = useDispatch();
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    useEffect(() => {
        let intended = location.state
        if (intended) {
            return
        } else {
            if (user && user.token) {
                navigate("/user/orders");
            }
        }

    }, [user, location, navigate])


    if (errored && message) {
        swal.fire({
            text: message,
            icon: 'error',
            didOpen: () => {
                setLoading(false);
                setShowForm(false)

            },
            didClose: () => {
                navigate('/auth/password/forgot')
                setShowForm(true)
                setErrored(false)
                dispatch(clearMessage())
            }
        }).then(result => {
            dispatch(clearMessage())

            dispatch(clearMessage())

        }).catch(error => {
            dispatch(clearMessage())
            setSuccessful(false)
            setShowForm(false)
            setLoading(false);

        });
    }

    if (successful && message) {
        swal.fire({
            text: message,
            icon: 'success',
            didOpen: () => {
                setLoading(false);
                setShowForm(false)

            },
            didClose: () => {
                navigate('/auth/login')
                setErrored(false)
                dispatch(clearMessage())
            }
        }).then(result => {
            dispatch(clearMessage())


        }).catch(error => {
            dispatch(clearMessage())
            setSuccessful(false)
            setShowForm(false)
            setLoading(false);
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        setSuccessful(false)
        setErrored(false)
        // const formData = {};
        //

        const formData = Object.keys(form).reduce((acc, key) => {
            let value = form[key].value;
            return {
                ...acc,
                [key]: value,
            };
        }, {});

        formData['resetPasswordLink'] = token;
        dispatch(resetPassword(formData))
            .unwrap()
            .then(() => {
                setSuccessful(true);
                setErrored(false)

            })
            .catch(() => {
                setSuccessful(false);
                setErrored(true)

            });


    }


    const handleChange = useForm(setForm, setFormIsValid);


    const signupForm = () => {
        return (

            <form className='row g-3' onSubmit={handleSubmit}>

                <Form
                    form={form}
                    handleChange={handleChange}
                    togglePasswordVisibility={togglePasswordVisibility}
                    passwordVisible={passwordVisible}
                >
                    <button type="submit" className="btn btn-primary" disabled={!formIsValid}>
                        Submit
                    </button>

                </Form>


            </form>


        );
    };
    if (isLoggedIn) {
        // return <Navigate replace to="/user/history"/>
    } else {

        return (
            <>
                {showForm && <>
                    <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Password change form</h5>
                        <p className="text-center ">Choose a new password and confirm it below</p>
                    </div>
                    {signupForm()}
                </>}
            </>
        );
    }

}
export default PasswordResetForm;