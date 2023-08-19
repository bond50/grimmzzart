import React, {lazy, useState} from "react";
import useSWR from "swr";
import {Link} from "react-router-dom";
import {deleteUser, getAllUsers} from "../../services/userManagement.service";
import {useSelector} from "react-redux";
import { Input, Modal, Table, Button, Space, Tag } from "antd";
import Auth from "../../components/wrappers/Auth";
const {Search} = Input;


const UserManagement = () => {
    const {user} = useSelector((state) => state.auth);
    const token = user.token;
    const {data: users, error, mutate} = useSWR([token], getAllUsers);
    const [searchText, setSearchText] = useState('');


    const handleDeleteUser = async (userId) => {
    try {
        await deleteUser(userId, token);
        await mutate(); // Re-fetch the data after deleting a user
    } catch (error) {
        // Display the error message using Modal.error
        Modal.error({
            title: 'Error',
            content: error.response.data.message || 'An error occurred while deleting the user.',
        });
    }
};


    const showDeleteConfirm = (userId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this user?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                await handleDeleteUser(userId);
            },
        });
    };

    const getUserStatus = (user) => {
        if (user.blocked) return "Permanently Blocked";
        if (user.suspended) return "Suspended";
        return "Active";
    };

    const handleSearch = value => {
        setSearchText(value);
    };

    const searchResults = searchText
        ? users.filter(user =>
            Object.values(user)
                .some(val => val.toString().toLowerCase().includes(searchText.toLowerCase())))
        : users;

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),
        },
        {
            title: "Last Name",
            dataIndex: "surname",
            key: "surname",
            sorter: (a, b) => a.surname.localeCompare(b.surname),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            filters: [
                {text: 'Active', value: 'Active'},
                {text: 'Not Active', value: 'Not Active'},
                {text: 'Suspended', value: 'Suspended'},
                {text: 'Permanently Blocked', value: 'Permanently Blocked'},
            ],
            onFilter: (value, record) => getUserStatus(record) === value,
            render: (_, record) => {
                const status = getUserStatus(record);
                const color = status === "Active" ? "green" : (status === "Suspended" ? "orange" : (status === "Not Active" ? "blue" : "red"));
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/user-management/edit/${record._id}`}>View/Edit</Link>

                    <Button
                        onClick={() => showDeleteConfirm(record._id)}
                        type="primary"
                        danger
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    if (error) return <div>Error loading users</div>;
    if (users && users.error) return <div>{users.error}</div>; // Display the server error message
    if (!users) return <div>Loading...</div>;

    return (
        <Auth cardTitle='User Management'>
            <div className="mb-3">
                <Link to="/user-management/create-user">
                    <Button type="primary">Create User</Button>
                </Link>
            </div>
            <Search
                placeholder="Search users"
                onSearch={handleSearch}
                enterButton
                style={{marginBottom: "16px"}}
            />
            <Table
                columns={columns}
                dataSource={searchResults}
                rowKey="_id"
                pagination={{pageSize: 10}}
            />
        </Auth>
    );
}

export default UserManagement

