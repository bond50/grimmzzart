import React, {useEffect, useState} from 'react';
import {MDBBtn, MDBInput, MDBSpinner} from "mdb-react-ui-kit";
import {forgotPassword} from "../../redux/slices/auth";

import {useDispatch, useSelector} from "react-redux";
import {clearMessage} from "../../redux/slices/message";
import Swal from "sweetalert2";
import {useLocation, useNavigate} from "react-router-dom";
import Success from "../../ui/success/Success";


const ForgotPassword = (props) => {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [errored, setErrored] = useState(false)
    const {message} = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const {isLoggedIn, user} = useSelector((state) => state.auth);


    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    useEffect(() => {
        let intended = location.state
        if (intended) {
            return
        } else {
            if (user && user.token) {
                navigate("/user/history");
            }
        }

    }, [user, location, navigate])

    if (errored && message) {
        let shownMessage = message
        if (Array.isArray(message)) {
            shownMessage = message[0].msg
        }

        Swal.fire({
            text: shownMessage,
            icon: 'error',
            didOpen: () => {
                setLoading(false);
                setShowForm(false)

            },
            didClose: () => {
                setShowForm(true)
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


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        dispatch(clearMessage());
        setErrored(false)
        setSuccessful(false);
        dispatch(forgotPassword({email}))
            .unwrap()
            .then(() => {

                Swal.fire({
                    text: 'Please check your email and follow instructions to reset your password',
                    icon: 'success',
                    didOpen: () => {
                        setLoading(false)
                        setShowForm(false)
                        setSuccessful(true);
                    },
                    didClose: () => {
                        dispatch(clearMessage())
                        setShowForm(true)
                    }
                }).then(result => {
                    dispatch(clearMessage())
                    setEmail("")

                }).catch(error => {
                    setLoading(false)
                    setSuccessful(false);
                });

            })
            .catch(() => {
                setSuccessful(false);
                setErrored(true)

            });

    }


    const handleChange = e => {
        setEmail(e.target.value)
    };


    return (
        <>

            {showForm &&
            <>
                <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">{successful ? 'Done!' : 'Recover your password'}</h5>

                    <p className="text-center ">{successful ? 'Check your email and follow the instructions to recover your password' : 'You can request a password reset below. We will send a link to the\n' +
                        '                        email address provided if its registered, please make sure it is correct.'}</p>

                </div>
                <form className='row g-3' onSubmit={handleSubmit}>
                    {!successful &&
                    <div className="col-12">
                        <MDBInput
                            label='RegisterWizard'
                            disabled={loading}
                            id='email'
                            type='email'
                            name='email'
                            value={email}
                            onChange={handleChange}/>

                    </div>
                    }

                    {
                        message && Array.isArray(message) ? message.map(m => {
                            return <div className="col-12 " key={m.param}>
                                <div
                                    className={"text-danger "}
                                    role="alert"
                                >
                                    {m.msg}
                                </div>
                            </div>
                        }) : <div className="col-12 ">
                            <div
                                className={successful ? "text-success" : "text-danger "}
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    }
                    {!successful && <div className='col-12'>
                        <MDBBtn
                            type='submit'
                            className='btn btn-primary  w-100'
                            disabled={loading || !email}>
                            {loading ? <>
                                <MDBSpinner size='sm' role='status' tag='span' className='me-2'/>
                                Loading...
                            </> : 'Request password reset'}
                        </MDBBtn>
                    </div>}
                    {successful && <div className="col-12 mt-5">
                        <Success/>
                    </div>}

                    <div className="col-12 mt-5">
                        <p className="small mb-0 text-muted">
                            For further support, you may visit the Help Center or contact our customer service team.
                        </p>
                    </div>
                </form>

            </>
            }


        </>
    );
};

export default ForgotPassword;