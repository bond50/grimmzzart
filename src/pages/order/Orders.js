import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders, removeOrder, updateOrder} from "../../redux/slices/orderSlice";
import {Table, Select, Space, Input, Tag, Popconfirm, Button, Form, Modal, Spin} from 'antd';
import {Icon} from '@iconify/react';
import {Link} from "react-router-dom";
import {updateOrderStatus} from "../../services/order.service";
import {toast} from "react-toastify";

const {Option} = Select;
const {Search} = Input;

const Orders = () => {

    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);
    const {user} = useSelector((state) => state.auth);
    const [statusFilter, setStatusFilter] = useState('');
    const [currentOrder, setCurrentOrder] = useState(null);
    const [form] = Form.useForm();
    const [orderIdFilter, setOrderIdFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {loading} = useSelector(state => state.orders);


    const ORDER_STATUSES = [
        'Pending', 'Confirmed', 'Processing', 'Awaiting Payment Confirmation', 'Paid', 'Shipped', 'In Transit',
        'Out for Delivery', 'Delivered', 'Failed Delivery', 'Returned', 'Refunded', 'Cancelled', 'Warranty Claim',
        'Service/Repair', 'Replacement Sent'
    ];

    const STATUS_COLOR_MAP = {
        'Pending': 'gold',
        'Confirmed': 'blue',
        'Processing': 'cyan',
        'Awaiting Payment Confirmation': 'orange',
        'Paid': 'green',
        'Shipped': 'purple',
        'In Transit': 'blue',
        'Out for Delivery': 'cyan',
        'Delivered': 'green',
        'Failed Delivery': 'red',
        'Returned': 'yellow',
        'Refunded': 'gray',
        'Cancelled': 'red',
        'Warranty Claim': 'pink',
        'Service/Repair': 'brown',
        'Replacement Sent': 'lime'
    };

    useEffect(() => {

        const fetchFilteredOrders = () => {
            let query = '';

            // Only add the status to the query if it's not an empty string
            if (statusFilter) {
                query += `status=${statusFilter}&`;
            }
            if (orderIdFilter) {
                query += `orderId=${orderIdFilter}&`;
            }

            dispatch(fetchOrders({token: user.token, query: query}));
        };

        fetchFilteredOrders();
    }, [dispatch, user.token, statusFilter, orderIdFilter]);


    const handleEdit = (record) => {
        setCurrentOrder(record);
        form.setFieldsValue({orderStatus: record.orderStatus});
        setIsModalOpen(true);
    };


    const handleOk = async () => {
        if (currentOrder) {
            try {
                const updatedStatus = form.getFieldValue('orderStatus');
                await dispatch(updateOrder({token: user.token, orderId: currentOrder._id, status: updatedStatus}));
                toast.success(`Order ${currentOrder.orderId} status updated successfully`);
                dispatch(fetchOrders(user.token)); // Refresh the orders list after updating
                setIsModalOpen(false);
            } catch (error) {
                console.error("Failed to update order status:", error);
                toast.error(`Failed to update order ${currentOrder.orderId} status`);
            }
        }
    };


    const handleDelete = async (record) => {
        try {
            await dispatch(removeOrder({token: user.token, orderId: record._id}));
            toast.success(`Order ${record.orderId} has been deleted successfully`);
            dispatch(fetchOrders(user.token)); // Refresh the orders list after deletion
        } catch (error) {
            console.error("Failed to delete order:", error);
            toast.error(`Failed to delete order ${record.orderId}`);
        }
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
            sorter: (a, b) => a.orderId.localeCompare(b.orderId),
            filterIcon: filtered => <Search style={{color: filtered ? '#1890ff' : undefined}}/>,
        },
        {
            title: 'Ordered By',
            dataIndex: ['orderedBy', 'email'],  // Use an array to access nested properties
            key: 'orderedBy',
            sorter: (a, b) => a.orderedBy.name.localeCompare(b.orderedBy.name),
        },
        {
            title: 'Status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            filters: ORDER_STATUSES.map(status => ({text: status, value: status})),
            onFilter: (value, record) => record.orderStatus === value,
            render: status => <Tag color={STATUS_COLOR_MAP[status]}>{status}</Tag>,
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmountPaid',
            key: 'totalAmountPaid',
            sorter: (a, b) => a.totalAmountPaid - b.totalAmountPaid,
        },

        {
            title: 'Currency',
            dataIndex: 'currencyCode',
            key: 'currencyCode',
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },


        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: text => new Date(text).toLocaleDateString(),
            sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/orders/${record._id}`}>
                        <Icon icon='mdi:eye-outline' style={{fontSize: '24px'}}/>
                    </Link>
                    <Button onClick={() => handleEdit(record)}>Edit status</Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                        <Button>Delete</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];


    return (
        <Spin spinning={loading}>
            <Space style={{marginBottom: 16}}>
                <Select
                    value={statusFilter}
                    onChange={(value) => setStatusFilter(value)}
                    placeholder="Filter by Status"
                    style={{width: 200}}
                >
                    <Option value="">All Orders</Option>
                    <Option value="Pending">Pending</Option>
                    <Option value="Confirmed">Confirmed</Option>
                    <Option value="Processing">Processing</Option>
                    <Option value="Awaiting Payment Confirmation">Awaiting Payment Confirmation</Option>
                    <Option value="Paid">Paid</Option>
                    <Option value="Shipped">Shipped</Option>
                    <Option value="In Transit">In Transit</Option>
                    <Option value="Out for Delivery">Out for Delivery</Option>
                    <Option value="Delivered">Delivered</Option>
                    <Option value="Failed Delivery">Failed Delivery</Option>
                    <Option value="Returned">Returned</Option>
                    <Option value="Refunded">Refunded</Option>
                    <Option value="Cancelled">Cancelled</Option>
                    <Option value="Warranty Claim">Warranty Claim</Option>
                    <Option value="Service/Repair">Service/Repair</Option>
                    <Option value="Replacement Sent">Replacement Sent</Option>
                </Select>
                <Search
                    placeholder="Search by Order ID"
                    onSearch={value => setOrderIdFilter(value)}
                    style={{width: 250}}
                />

            </Space>

            <Table dataSource={orders} columns={columns} rowKey="_id"/>

            <Modal
                title="Edit Order status"
                open={isModalOpen}
                onOk={handleOk}
                confirmLoading={loading}
                onCancel={handleCancel}

            >
                <Form form={form} layout="vertical">
                    <Form.Item name="orderStatus" label="Order Status">
                        <Select>
                            <Option value="Pending">Pending</Option>
                            <Option value="Confirmed">Confirmed</Option>
                            <Option value="Processing">Processing</Option>
                            <Option value="Awaiting Payment Confirmation">Awaiting Payment Confirmation</Option>
                            <Option value="Paid">Paid</Option>
                            <Option value="Shipped">Shipped</Option>
                            <Option value="In Transit">In Transit</Option>
                            <Option value="Out for Delivery">Out for Delivery</Option>
                            <Option value="Delivered">Delivered</Option>
                            <Option value="Failed Delivery">Failed Delivery</Option>
                            <Option value="Returned">Returned</Option>
                            <Option value="Refunded">Refunded</Option>
                            <Option value="Cancelled">Cancelled</Option>
                            <Option value="Warranty Claim">Warranty Claim</Option>
                            <Option value="Service/Repair">Service/Repair</Option>
                            <Option value="Replacement Sent">Replacement Sent</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>


        </Spin>
    );
};

export default Orders;
