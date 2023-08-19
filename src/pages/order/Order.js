import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchOrder} from "../../redux/slices/orderSlice";
import {Spin, Descriptions, Table, Typography} from 'antd';
import {useParams} from "react-router-dom";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const {_id: orderId} = useParams();
    const {orders, loading} = useSelector(state => state.orders);
    const order = orders.find(o => o._id === orderId);
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if (!order) {
            dispatch(fetchOrder({token: user.token, orderId}));
        }
    }, [dispatch, orderId, order, user.token]);


    const columns = [
        {
            title: 'Image',
            dataIndex: ['product', 'image'],
            key: 'image',
            render: (src) => <img src={src} alt="Product" style={{width: '50px'}}/>,
        },
        {
            title: 'Product Name',
            dataIndex: ['product', 'name'],
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: ['product', 'price'],
            key: 'price',
            render: (price) => `$${price}`, // Format price to 2 decimal places
        },
        {
            title: 'Quantity',
            dataIndex: 'count',
            key: 'count',
        },
    ];

    const formatAddress = (address) => {
        return `${address.streetAddress}, ${address.city}, ${address.state}, ${address.country}`;
    };

    console.log(order.products)

    return (
        <Spin spinning={loading}>
            {order && (
                <div style={{padding: '20px'}}>
                    <Typography.Title level={2}>Order Details for {order.orderId}</Typography.Title>
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label="Order ID">{order.orderId}</Descriptions.Item>
                        <Descriptions.Item label="Order Status">{order.orderStatus}</Descriptions.Item>
                        <Descriptions.Item
                            label="Order Date">{new Date(order.orderDate).toLocaleDateString()}</Descriptions.Item>
                        <Descriptions.Item label="Currency Code">{order.currencyCode}</Descriptions.Item>
                        <Descriptions.Item label="Payment Method">{order.paymentMethod}</Descriptions.Item>
                        <Descriptions.Item label="Total Amount Paid">{order.totalAmountPaid}</Descriptions.Item>
                        <Descriptions.Item
                            label="Delivery Start Date">{new Date(order.deliveryStartDate).toLocaleDateString()}</Descriptions.Item>
                        <Descriptions.Item
                            label="Delivery End Date">{new Date(order.deliveryEndDate).toLocaleDateString()}</Descriptions.Item>
                        <Descriptions.Item
                            label="Shipping Address">{formatAddress(order.shippingAddress)}</Descriptions.Item>
                    </Descriptions>
                    <Typography.Title level={3} style={{marginTop: '20px'}}>Products</Typography.Title>
                    <Table dataSource={order.products} columns={columns} rowKey="product._id" pagination={false}/>
                </div>
            )}
        </Spin>
    );
};

export default OrderDetails;
