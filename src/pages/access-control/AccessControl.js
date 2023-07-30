import React, {useState, useEffect} from "react";
import {Form, Select, Checkbox, Button, Row, Col} from "antd";
import {roles} from "../../../components/tempUtils";

const {Option} = Select;

const RolePermissionForm = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        if (selectedRole) {
            setPermissions(roles[selectedRole].can);
        }
    }, [selectedRole]);

    const handleRoleChange = (value) => {
        setSelectedRole(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // send a request to the backend to update the role and permissions
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item label="Role">
                <Select
                    placeholder="Select a role"
                    onChange={handleRoleChange}
                    value={selectedRole}
                >
                    {Object.keys(roles).map((role) => (
                        <Option key={role} value={role}>
                            {role}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Permissions">
                <Row gutter={16}>
                    {permissions.map((permission) => (
                        <Col key={permission} span={8}>
                            <Checkbox value={permission}>{permission}</Checkbox>
                        </Col>
                    ))}
                </Row>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RolePermissionForm;
