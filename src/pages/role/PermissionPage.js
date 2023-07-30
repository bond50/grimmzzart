// import React, {useState, useEffect, useCallback} from "react";
// import {Card, Switch, Button, Space, Checkbox, Alert} from "antd";
// import {getPermissions} from "../../../services/permission.service";
// import {useLocation, useParams, useNavigate} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import './Permission.css'
// import {updateRole} from "../../../services/role.service";
// import {setMessage} from "../../../redux/slices/message";
//
// const PermissionPage = () => {
//     const {roleId} = useParams();
//     const {token} = useSelector((state) => state.auth.user);
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [loadedPermissions, setLoadedPermissions] = useState([]);
//     const [rolePermissions, setRolePermissions] = useState([]);
//     const [permissionsState, setPermissionsState] = useState([]);
//     const [roleName, setRoleName] = useState('');
//     const {message} = useSelector((state) => state.message);
//     const dispatch = useDispatch()
//
//
//     const loadAllPermissions = useCallback(() => {
//         getPermissions(token).then((res) => {
//             setLoadedPermissions(res.data);
//         });
//     }, [token]);
//
//     useEffect(() => {
//         loadAllPermissions();
//     }, [loadAllPermissions]);
//
//     useEffect(() => {
//         if (!roleId || !location.state) {
//             navigate("/admin/roles");
//         } else {
//             const {permissions, name} = location.state;
//             setRolePermissions(permissions);
//             setRoleName(name);
//         }
//     }, [roleId, navigate, location.state]);
//
//
//     useEffect(() => {
//         const permissionsState = loadedPermissions.map((permission) => ({
//             ...permission,
//             checked: rolePermissions.includes(permission._id),
//         }));
//
//         setPermissionsState(permissionsState);
//     }, [loadedPermissions, rolePermissions]);
//
//
//     const handleToggleSwitch = (permissionId) => {
//         const newPermissionsState = permissionsState.map((permission) => {
//             if (permission._id === permissionId) {
//                 return {...permission, checked: !permission.checked};
//             } else {
//                 return permission;
//             }
//         });
//         setPermissionsState(newPermissionsState);
//     };
//
//     const handleBulkToggle = (subject) => {
//         const newPermissionsState = permissionsState.map((permission) => {
//             if (subject === null || permission.subject === subject) {
//                 const allChecked = permissionsState
//                     .filter((p) => subject === null || p.subject === subject)
//                     .every((p) => p.checked);
//
//                 return {...permission, checked: !allChecked};
//             } else {
//                 return permission;
//             }
//         });
//
//         setPermissionsState(newPermissionsState);
//     };
//
//
//     const categorizePermissions = () => {
//         const categories = {};
//         permissionsState.forEach((permission) => {
//             if (!categories[permission.subject]) {
//                 categories[permission.subject] = [];
//             }
//             categories[permission.subject].push(permission);
//         });
//         return categories;
//     };
//     const categorizedPermissions = categorizePermissions();
//     const renderMessage = () => {
//         if (message) {
//             const {type, content} = message;
//             return (
//                 <Alert
//                     message={content}
//                     type={type}
//                     closable
//                     onClose={() => dispatch(setMessage(null))}
//                     className="role-message"
//                 />
//             );
//         }
//         return null;
//     };
//
//     async function handleSave() {
//         const updatedPermissions = permissionsState
//             .filter((permission) => permission.checked)
//             .map((permission) => permission._id);
//
//         const roleData = {
//             permissions: updatedPermissions,
//         };
//
//
//         try {
//             const response = await updateRole(token, roleId, roleData);
//             dispatch(setMessage({type: 'success', content: response.data.message}));
//
//             navigate("/admin/roles");
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 const errorMessage = error.response.data.message || 'An error occurred while resetting roles and permissions.';
//                 dispatch(setMessage({type: 'error', content: errorMessage}));
//                 console.log('err', error.response.data);
//             } else {
//                 console.log('err', error);
//             }
//         }
//     }
//
//
//     return (
//         <div className="permissions-card card-top-border">
//             <div className="container mt-5">
//                 <div className="permissions-header d-flex justify-content-between mb-4">
//                     <h2>Permissions for {roleName}</h2>
//                     <Button onClick={() => navigate("/admin/roles")}>Back</Button>
//                 </div>
//                 <Card className="permissions-category mb-4">
//                     <div className="row">
//                         <div className="col-12 d-flex align-items-center mb-4">
//                             <Checkbox
//                                 onChange={() => handleBulkToggle(null)}
//                                 className="toggle-all-checkbox"
//                             >
//                                 Toggle All
//                             </Checkbox>
//                         </div>
//                         {Object.keys(categorizedPermissions).map((subject, index) => (
//                             <div key={subject} className="col-12 subject-section">
//                                 {index !== 0 && <hr/>}
//                                 <h3 className="subject-title mb-3">{subject}</h3>
//                                 <div className="row">
//                                     {categorizedPermissions[subject].map((permission) => (
//                                         <div
//                                             key={permission._id}
//                                             className="col-12 col-md-6 d-flex align-items-center mb-3 permissions-item"
//                                         >
//                                             <Switch
//                                                 checked={permission.checked}
//                                                 onChange={() => handleToggleSwitch(permission._id)}
//                                             />
//                                             <span className="permissions-description ms-2">
//                       {permission.description}
//                     </span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     {renderMessage()}
//                 </Card>
//                 <div className="permissions-footer d-flex justify-content-end mt-3">
//                     <Space>
//                         <Button onClick={() => navigate("/admin/roles")}>Cancel</Button>
//                         <Button type="primary" onClick={handleSave}>
//                             Save
//                         </Button>
//                     </Space>
//
//                 </div>
//             </div>
//         </div>
//     );
//
//
// };
//
// export default PermissionPage;
//

import React from 'react';

const PermissionPage = () => {
    return (
        <div>
            PERMISSION
        </div>
    );
};

export default PermissionPage;