import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {Icon} from '@iconify/react';
import './Admin.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders, fetchTotalAmount} from "../redux/slices/orderSlice";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);

    const totalOrders = orders.length;
    const totalAmount = useSelector(state => state.orders.totalAmount);
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchOrders(user.token));
        dispatch(fetchTotalAmount(user.token));
    }, [dispatch, user.token]);


    const formatter = new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
    });

    let formattedAmount = formatter.format(totalAmount);

    return (
        <div className="dashboard container">
            <div className="row">
                <div className="col-xl-12 col-sm-12 mb-3">
                    <div className="card o-hidden ">
                        <div className="card-body">
                            <div className="text-center card-font-size">Total Amount sold<br/>
                                <h1>{formattedAmount}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {renderCard("Products", 'mdi:cart-outline', "/products", "products-card")}
                {renderCard(`Orders`, 'mdi:receipt-outline', "/orders", "orders-card", `${totalOrders}`)}
                {renderCard("Users", 'mdi:account-group-outline', "/user-management", "customers-card")}
                {renderCard("Out of Stock", 'mdi:cart-off', "#", "out-of-stock-card")}
            </div>
        </div>
    );
};

const renderCard = (title, icon, link, cardType, count) => {
    return (
        <div className="col-xxl-3 col-md-6">
            <div className={`card info-card ${cardType}`}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <Icon icon={icon} fontSize={30} className='card-icon-inner'/>
                        </div>
                        <div className="ps-3">
                            <h6>{count}</h6>
                            <Link to={link}>
                                <span className="text-success small pt-1 fw-bold">View Details</span>
                                <Icon icon='mdi:chevron-right'/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
