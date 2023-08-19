import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {MDBBtn, MDBInput, MDBSpinner} from "mdb-react-ui-kit";
import {verify2FA} from "../../redux/slices/auth";
import Swal from "sweetalert2";
import {useNavigate, useLocation} from 'react-router-dom';
import {unwrapResult} from "@reduxjs/toolkit";
import {getUserVerificationInfo} from "../../services/userManagement.service";
import {clearMessage} from "../../redux/slices/message";

const OTPPage = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [token2FA, setToken2FA] = useState('');
    const [userInfo, setUserInfo] = useState([])


    const userId = location.state?.userId;

    useEffect(() => {
        if (userId) {
            getUserVerificationInfo(userId)
                .then(data => {
                    setUserInfo(data);
                })
                .catch(error => {
                    console.error("Error fetching user info:", error);
                });
        } else {
            navigate('/login');
        }
    }, [navigate, userId]);


    const fireAlert = (text, icon, callback) => {
        Swal.fire({
            text,
            icon,
        }).then(callback).catch(error => {
            dispatch(clearMessage())
        });
    };


    const {message, qrCode, hasLoggedInBefore, is2FAEnabled} = userInfo

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

    console.log(userInfo)
    console.log(hasLoggedInBefore)
    console.log(is2FAEnabled)

    if (hasLoggedInBefore && is2FAEnabled) {
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
    }

    if (qrCode) {
        return (
            <>
                <div className="">
                    <h5 className="card-title text-center pb-0 fs-4">Secure Your Account</h5>
                    {message && <p className="text-center ">{message}</p>}
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
    }

}

export default OTPPage;
