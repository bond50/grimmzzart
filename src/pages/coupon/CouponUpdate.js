import React, {Suspense, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {getCoupon, editCoupon, createCoupon} from "../../services/coupon.service";
import {useDispatch, useSelector} from "react-redux";

import Auth from "../../components/wrappers/Auth";
import {toast} from "react-toastify";
import {clearMessage} from "../../redux/slices/message";

const DatePicker = React.lazy(() => import("react-datepicker"));

const CouponUpdate = () => {
    const {token} = useSelector((state) => state.auth.user);
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [usageLimit, setUsageLimit] = useState(0);
    const [expirationDate, setExpiryDate] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    let {id} = useParams();
    const dispatch = useDispatch()
    const {auth} = useSelector(state => ({...state}))


    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    useEffect(() => {
        setLoading(true)
        getCoupon(id, token)
            .then(r => {
                const {discount, usageLimit, code, expirationDate} = r.data.coupon
                setLoading(false)
                setDiscount(discount)
                setExpiryDate(expirationDate)
                setCode(code)
                setUsageLimit(usageLimit)
            })
            .catch(e => {
                setLoading(false)
                console.log(e)
            })

    }, [id, token])

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        editCoupon({expirationDate, discount, code, usageLimit}, id, auth.user.token,)
            .then(r => {
                setLoading(false)
                setDiscount('')
                setExpiryDate('')
                setCode('')
                toast.success(`${r.data.coupon.code} is updated`, {
                    position: toast.POSITION.BOTTOM_CENTER
                })
                navigate("/coupon");
            }).catch((e) => {
            setLoading(false)
            console.log(e)
        })

    };


    return (
        <Auth cardTitle={`Update ${code}`}>



                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-muted" htmlFor="form1Example1">Code:</label>
                                <input
                                    type="text"
                                    id="code"
                                    className='form-control'
                                    value={code}
                                    required
                                    autoFocus
                                    onChange={(e) =>
                                        setCode(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="form1Example1">Discount %:</label>
                                <input
                                    className='form-control'
                                    type="number"
                                    id="discount"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="form1Example1">Usage Limit:</label>
                                <input
                                    type="number"
                                    className='form-control'
                                    id="usageLimit"
                                    value={usageLimit}
                                    onChange={(e) => setUsageLimit(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="form1Example1">Expiry Date:</label>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <DatePicker
                                        className='form-control'
                                        selected={new Date()}
                                        value={expirationDate}
                                        required
                                        showTimeSelect
                                        placeholderText="Select a date and time"
                                        dateFormat="Pp"
                                        onChange={(date) => {
                                            setExpiryDate(date)
                                        }}
                                    />
                                </Suspense>
                            </div>
                            <div className="mb-3">
                                <button type='submit' className='btn btn-outline-primary'>
                                    {loading ? 'Saving...' : "Save"}
                                </button>
                            </div>
                        </form>


        </Auth>
    );
};

export default CouponUpdate;