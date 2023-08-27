import Auth from "../../components/wrappers/Auth";
import React, {useCallback, Suspense, useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";

import {createCoupon, getCoupons, removeCoupon} from "../../services/coupon.service";
import {toast} from "react-toastify";
import {Icon} from '@iconify/react';
import {Link} from "react-router-dom";

const DatePicker = React.lazy(() => import("react-datepicker"));

const CreateCouponPage = () => {
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [usageLimit, setUsageLimit] = useState(0);
    const [expirationDate, setExpiryDate] = useState('')
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(false)
    const {auth} = useSelector(state => ({...state}))

    const loadCoupons = useCallback(() => {
        getCoupons(auth.user.token)
            .then(r => {
                setCoupons(r.data.coupons)
            }).catch((e) => {
            console.log(e)
        })
    }, [auth.user.token]);

    useEffect(() => {
        loadCoupons()
    }, [loadCoupons])

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        createCoupon({expirationDate, discount, code, usageLimit}, auth.user.token)
            .then(r => {
                setLoading(false)
                setDiscount('')
                setExpiryDate('')
                setCode('')
                toast.success(`${r.data.coupon.code} is created`)
                loadCoupons()
            }).catch((e) => {
            setLoading(false)
            console.log(e)
        })
    };

    function handleRemove(id) {
        if (window.confirm('Delete this coupon?')) {
            setLoading(true)
            removeCoupon(id, auth.user.token).then(r => {
                setLoading(false)
                loadCoupons()
                toast.success(`${r.data.code} deleted`)
            }).catch(e => {
                console.log(e)
                setLoading(false)
            })
        }
    }

    return (
        <Auth cardTitle='Manage coupon codes'>
            <form onSubmit={handleSubmit}>
                <div className=" mb-3">
                    <label className="form-label text-muted" htmlFor="form1Example1">Code:</label>
                    <input
                        type="text"
                        id="code"
                        className='form-control'
                        value={code}
                        required
                        autoFocus
                        onChange={(e) => setCode(e.target.value)}
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
                    <br/>
                    <DatePicker
                        className='form-control'
                        selected={expirationDate}
                        value={expirationDate}
                        required
                        showTimeSelect
                        placeholderText="Select a date and time"
                        dateFormat="Pp"
                        onChange={(date) => {
                            setExpiryDate(date);
                        }}
                    />

                </div>
                <div className="mb-3">
                    <button type='submit' className='btn btn-outline-primary'>
                        {loading ? 'Saving...' : "Save"}
                    </button>
                </div>
            </form>
            {coupons.length > 0 && (
                <table className="table table-bordered table-sm">
                    <thead className='table-light'>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Expiry</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Usage limit</th>
                        <th scope="col">Usage count</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {coupons && coupons.map(c => {
                        return (
                            <tr key={c._id}>
                                <td>{c.code}</td>
                                <td>{new Date(c.expirationDate).toLocaleString()}</td>
                                <td>{c.discount}%</td>
                                <td>{c.usageLimit}</td>
                                <td>{c.usageCount}</td>
                                <td>
                                    <Link to={`/coupon/${c._id}`}>
                                        <Icon icon="material-symbols:edit-square-outline-sharp" className='text-info'
                                              fontSize={20}/>
                                    </Link>
                                </td>
                                <td>
                                    <Icon
                                        icon="material-symbols:auto-delete-outline"
                                        className='text-danger pointer' fontSize={20}
                                        onClick={() => handleRemove(c._id)}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )}
        </Auth>
    );
};

export default CreateCouponPage;
