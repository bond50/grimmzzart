// import React, {useState} from 'react';
// import {Button, Form, Input, Select} from 'antd';
//
// const {Option} = Select;
//
// const RouteForm = ({onSubmit, initialValues, action, permissions}) => {
//     const [form] = Form.useForm();
//     const [loading, setLoading] = useState(false);
//
//     const handleSubmit = (values) => {
//         onSubmit(values);
//         form.resetFields();
//     };
//
//     return (
//         <Form
//             layout="vertical"
//             form={form}
//             onFinish={handleSubmit}
//             initialValues={initialValues}
//             autoComplete="off"
//         >
//             <Form.Item
//                 label="Path"
//                 name="path"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter the route path.',
//                     },
//                 ]}
//             >
//                 <Input/>
//             </Form.Item>
//
//             <Form.Item
//                 label="Method"
//                 name="method"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please select a method.',
//                     },
//                 ]}
//             >
//                 <Select placeholder="Select method">
//                     <Option value="GET">GET</Option>
//                     <Option value="POST">POST</Option>
//                     <Option value="PUT">PUT</Option>
//                     <Option value="DELETE">DELETE</Option>
//                 </Select>
//             </Form.Item>
//
//             <Form.Item
//                 label="Permissions"
//                 name="permissions"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please select at least one permission.',
//                     },
//                 ]}
//             >
//                 <Select mode="multiple" placeholder="Select permissions">
//                     {loading ? (
//                         <Option disabled>Loading...</Option>
//                     ) : (
//                         permissions &&
//                         permissions.map((permission) => (
//                             <Option key={permission._id} value={permission._id}>
//                                  {permission.description}
//                             </Option>
//                         ))
//                     )}
//                 </Select>
//             </Form.Item>
//
//             <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                     {action}
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
// };
//
// export default RouteForm;
import React from 'react';

const RouteForm = () => {
    return (
        <div>
            Route form
        </div>
    );
};

export default RouteForm;