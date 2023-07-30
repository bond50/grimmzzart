import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    Radio,
    notification,
    Checkbox,
    Card,
    Alert,
    Typography,
} from "antd";


import useSWR, {mutate} from "swr";
import {getUser, updateUser} from "../../services/userManagement.service";
import dayjs from "dayjs";
import {getRoles} from "../../services/role.service";
import Auth from "../../components/wrappers/Auth";



const {Title} = Typography;
const {Option} = Select;


const UserEdit = () => {
    const [suspensionPeriod, setSuspensionPeriod] = useState(null);
    const [showResetSuspensionAlert, setShowResetSuspensionAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => state.auth);
    const {userId} = useParams();
    const token = user.token;
    const [form] = Form.useForm();
    const [isSuspended, setIsSuspended] = useState(false);
    const isOwnProfile = userId === user._id;

    const fetcher = (key) => {
        const [userId, token] = key.split('|');
        return getUser(userId, token);
    };

    const {data: userData, error} = useSWR(
        `${userId}|${token}`, // Serialize the userId and token with a delimiter
        fetcher
    );

    const {data: rolesData} = useSWR(token, getRoles);






    useEffect(() => {
        if (userData) {
            form.setFieldsValue({
                ...userData,
                dob: userData.dob ? dayjs(userData.dob) : null,
            });
            setIsSuspended(userData.suspended);
        }
    }, [userData, form,]);


    const onStatusChange = (status) => {
        const newStatus = {active: false, blocked: false, suspended: false};
        newStatus[status] = true;
        form.setFieldsValue(newStatus);
        setIsSuspended(status === "suspended");
    };

    const onFinish = async (values) => {
        console.log('Before updating user:', values); // Add this line for debugging

        try {
            if (values.suspended) {
                values.suspensionPeriod = suspensionPeriod;
                values.suspensionStart = new Date();
                values.suspensionEnd = new Date();
                values.suspensionEnd.setDate(
                    values.suspensionEnd.getDate() + suspensionPeriod
                );
            } else {
                values.suspensionPeriod = null;
                values.suspensionStart = null;
                values.suspensionEnd = null;
            }

            await updateUser(userId, values, token);
            notification.success({message: "User updated successfully"});
            await mutate(`${userId}|${token}`);
            console.log('After updating user:', values);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            notification.error({message: error.message || "Error updating user"});
            console.error("Error updating user:", error);
        }
    };


    const resetSuspensionCount = async () => {
        try {
            await updateUser(userId, {suspensionCount: 0}, token);
            notification.success({message: "Suspension count reset successfully"});
            setShowResetSuspensionAlert(false);
            await mutate(`${userId}|${token}`);
        } catch (error) {
            notification.error({message: error.message || "Error resetting suspension count"});
            console.error("Error resetting suspension count:", error);
        }
    };


    if (error) return <div>{error.message || "Error fetching user data"}</div>;
    if (!userData) return <div>Loading...</div>;


    return (
        <Auth cardTitle='Edit User'>

            {userData.suspended && (
                <Alert
                    message="User Suspended"
                    description={`Suspension started on ${dayjs(userData.suspensionStart).format("MMM DD, YYYY")}, ends on ${dayjs(userData.suspensionEnd).format("MMM DD, YYYY")}. Suspension count: ${userData.suspensionCount}`}
                    type="warning"
                    showIcon
                    className="mb-4"
                />
            )}
            {userData.blocked && (
                <Alert message="User Blocked" type="error" showIcon className="mb-4"/>
            )}
            <Form layout="vertical" form={form} onFinish={onFinish}>
                {/* Personal Information */}
                <Card title="Personal Information" className="mb-4">
                    <div className="row gy-3">
                        {/* First Row */}
                        <div className="col-md-4">
                            <Form.Item label="Username" name="username"
                                       rules={[{required: true, message: "Please enter the username"}]}>
                                <Input/>
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {required: true, message: "Please enter the email"},
                                    {type: "email", message: "Please enter a valid email"},
                                    {
                                        validator: (_, value) =>
                                            isOwnProfile || !!value
                                                ? Promise.resolve()
                                                : Promise.reject(new Error("Email is required")),
                                    },
                                ]}
                            >
                                <Input disabled={isOwnProfile}/>
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item label="First Name" name="firstName"
                                       rules={[{required: true, message: "Please enter the first name"}]}>
                                <Input/>
                            </Form.Item>
                        </div>
                        {/* Second Row */}
                        <div className="col-md-4">
                            <Form.Item label="Middle Name" name="middleName">
                                <Input/>
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item label="Surname" name="surname"
                                       rules={[{required: true, message: "Please enter the surname"}]}>
                                <Input/>
                            </Form.Item>
                        </div>
                        {rolesData && rolesData.code === 4000 && (
                            <div className="col-md-4">
                                <Form.Item label="Driving License" name="drivingLicense">
                                    <Input/>
                                </Form.Item>
                            </div>
                        )}
                        {/* Third Row */}
                        <div className="col-md-4">
                            <Form.Item label="ID Number" name="idNo">
                                <Input disabled={!rolesData || rolesData.code !== 4000}/>
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item label="Phone Number" name="phoneNumber"
                                       rules={[
                                           {required: true, message: "Please enter the phone number"},
                                           {
                                               pattern: /^(?:\+254|0)[17]\d{8}$/,
                                               message: "Please enter a valid phone number"
                                           }
                                       ]}>
                                <Input/>
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item label="Role" name="role"
                                       rules={[{required: true, message: "Please select a role"}]}>
                                <Select placeholder="Select a role" disabled={userId === user._id}>
                                    {rolesData &&
                                    rolesData.map((role) => (
                                        <Option key={role._id} value={role._id}>
                                            {role.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item label="Date of Birth" name="dob">
                                <DatePicker/>
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item label="Gender" name="gender">
                                <Radio.Group>
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                    <Radio value="intersex">Intersex</Radio>
                                    <Radio value="undisclosed">Undisclosed</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                    </div>
                </Card>
                {/* Account Status */}
                <Card title="Account Status" className="mb-4">
                    <div className="row gy-3">
                        <div className="col-md-4">
                            <Form.Item
                                label="Blocked"
                                name="blocked"
                                valuePropName="checked"
                                onChange={() => onStatusChange("blocked")}
                            >
                                <Checkbox disabled={userId === user._id}/>
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item
                                label="Suspended"
                                name="suspended"
                                valuePropName="checked"
                                onChange={(e) => {
                                    onStatusChange("suspended");
                                }}
                            >
                                <Checkbox disabled={userId === user._id}/>
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item
                                label="Active"
                                name="active"
                                valuePropName="checked"
                                onChange={() => onStatusChange("active")}
                            >
                                <Checkbox disabled={userId === user._id}/>
                            </Form.Item>
                        </div>
                    </div>
                    {/* Account Status Card */}
                    {isSuspended && (
                        <div className="row gy-3">
                            <div className="col-md-4">
                                <Form.Item
                                    label="Suspension Period"
                                    name="suspensionPeriod" rules={[
                                    {
                                        required: isSuspended,
                                        message: "Please select a suspension period",
                                    },
                                ]}>
                                    <Select
                                        placeholder="Select suspension period"
                                        onChange={(value) => setSuspensionPeriod(value)}
                                    >
                                        <Option value={1}>1 minute</Option>
                                        <Option value={2}>2 minutes</Option>
                                        <Option value={10}>10 minutes</Option>
                                        <Option value={30}>30 minutes</Option>
                                        <Option value={60}>1 hour</Option>
                                        <Option value={90}>1 hour 30 minutes</Option>
                                        <Option value={120}>2 hours</Option>
                                        <Option value={180}>3 hours</Option>
                                        <Option value={240}>4 hours</Option>
                                        <Option value={480}>8 hours</Option>
                                        <Option value={720}>12 hours</Option>
                                        <Option value={1440}>24 hours</Option>
                                        <Option value={2880}>2 days</Option>
                                        <Option value={10080}>1 week</Option>
                                        <Option value={20160}>2 weeks</Option>
                                        <Option value={43200}>1 month</Option>
                                        <Option value={86400}>2 months</Option>
                                        <Option value={129600}>3 months</Option>
                                    </Select>


                                </Form.Item>

                            </div>
                            <div className="col-md-4">
                                {userData.suspensionCount > 0 &&
                                <Button type="primary" onClick={() => setShowResetSuspensionAlert(true)} danger>
                                    Reset Suspension Count
                                </Button>}
                                {showResetSuspensionAlert && (
                                    <Alert
                                        message="Are you sure you want to reset the suspension count?"
                                        type="warning"
                                        className="mt-3"
                                        action={
                                            <Button type="primary" size="small" onClick={resetSuspensionCount}>
                                                Yes, Reset
                                            </Button>
                                        }
                                        onClose={() => setShowResetSuspensionAlert(false)}
                                        closable
                                    />
                                )}
                            </div>
                        </div>
                    )}

                </Card>
                <div className="text-center mt-4">
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Save Changes
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Auth>
    );


};

export default UserEdit;

