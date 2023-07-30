// import React, {useState, useEffect} from "react";
// import {getRoles, resetRolesAndPermissions, deleteRole} from "../../../services/role.service";
// import {useSelector, useDispatch} from "react-redux";
// import {Alert, Button} from "antd";
// import Auth from "../../../components/wrappers/Auth";
// import RoleList from "../../../components/role/RoleList";
// import {useNavigate} from "react-router-dom";
// import './RolePage.css'
// import AddRoleForm from "../../../components/role/AddRoleForm";
// import {Modal} from 'antd';
// import {clearMessage, setMessage} from "../../../redux/slices/message";
//
//
// const RolePage = () => {
//     const [roles, setRoles] = useState([]);
//     const {token} = useSelector((state) => state.auth.user);
//     const {message} = useSelector((state) => state.message);
//     const [isAddRoleModalVisible, setIsAddRoleModalVisible] = useState(false);
//     const [roleAdded, setRoleAdded] = useState(false);
//     const dispatch = useDispatch()
//
//
//
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         dispatch(clearMessage());
//     }, [dispatch]);
//
//     useEffect(() => {
//         async function fetchData() {
//             const rolesData = await getRoles(token);
//             setRoles(rolesData);
//         }
//
//         fetchData();
//     }, [token, roleAdded]);
//
//     const handleRoleDelete = async (roleId) => {
//         try {
//             await deleteRole(token, roleId);
//             setRoles(roles.filter((role) => role._id !== roleId));
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || "An error occurred while deleting the role.";
//             dispatch(setMessage({type: "error", content: errorMessage}));
//         }
//     };
//
//
//     const renderMessage = () => {
//         if (message) {
//             const {type, content} = message;
//             setTimeout(() => {
//                 dispatch(setMessage(null));
//             }, 3000);
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
//
//     const handleRoleEdit = (role) => {
//
//         navigate(`/roles/${role._id}/permissions`, {
//             state: {permissions: role.permissions, name: role.name}
//         });
//     };
//
//     const handleResetRolesAndPermissions = async () => {
//         try {
//             Modal.confirm({
//                 title: 'Confirm Reset',
//                 content: 'Are you sure you want to reset roles and permissions? All newly added roles will be lost. This action cannot be undone.',
//                 onOk: async () => {
//                     const response = await resetRolesAndPermissions(token);
//                     dispatch(setMessage({type: 'success', content: response.data.message}));
//
//                     // Fetch the updated roles after resetting roles and permissions
//                     const rolesData = await getRoles(token);
//                     setRoles(rolesData.data);
//                 },
//                 onCancel: () => {
//                 },
//                 okText: 'Yes',
//                 cancelText: 'No'
//             });
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 const errorMessage = error.response.data.message || 'An error occurred while resetting roles and permissions.';
//                 dispatch(setMessage({type: 'error', content: errorMessage}));
//                 console.log('err', error.response.data);
//             } else {
//                 console.log('err', error);
//             }
//         }
//     };
//
//     const handleRoleAdded = async (newRole) => {
//         setRoles([...roles, newRole]);
//         setIsAddRoleModalVisible(false);
//         setRoleAdded(true);
//     };
//
//
//     return (
//         <Auth>
//             <div className="card roles-card card-top-border">
//                 <div className="card-header roles-card-header">
//                     <h1 className="card-title fs-2">Role List</h1>
//                     <p>
//                         Here you can manage user roles and their permissions.
//                     </p>
//                 </div>
//
//                 <div className="roles-card-body py-3">
//                     <RoleList
//                         token={token}
//                         roles={roles}
//                         onDelete={handleRoleDelete}
//                         onEdit={handleRoleEdit}
//                     />
//                     {renderMessage()}
//
//                     <div className="role-action-buttons">
//                         <Button
//                             type="primary"
//                             className="add-role-btn"
//                             size="large"
//                             onClick={() => setIsAddRoleModalVisible(true)}
//                         >
//                             Add Role
//                         </Button>
//                         <Button
//                             type="default"
//                             className="reset-roles-btn"
//                             size="large"
//                             onClick={handleResetRolesAndPermissions}
//                         >
//                             Reset Roles and Permissions
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             <Modal
//                 title="Add Role"
//                 className="add-role-modal"
//                 open={isAddRoleModalVisible}
//                 onCancel={() => setIsAddRoleModalVisible(false)}
//                 width={800}
//                 footer={null}
//             >
//                 <AddRoleForm
//                     onCancel={() => setIsAddRoleModalVisible(false)}
//                     onRoleAdded={handleRoleAdded}
//                 />
//             </Modal>
//
//
//         </Auth>
//     );
// };
//
// export default RolePage;
//
//

import React from 'react';

const RolesPage = () => {
    return (
        <div>
            ROLE PAGE
        </div>
    );
};

export default RolesPage;