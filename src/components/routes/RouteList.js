// // src/components/RouteList.js
// import React from 'react';
// import {Table, Button} from 'antd';
//
// const RouteList = ({routes, onDelete, onSelect}) => {
//     const columns = [
//         {
//             title: 'Path',
//             dataIndex: 'path',
//             key: 'path',
//         },
//         {
//             title: 'Permissions',
//             dataIndex: 'permissions',
//             key: 'permissions',
//             render: (permissions) =>
//                 permissions.map((permission) => (
//                     <div key={permission._id}>
//                         Allows {permission.action} operation on {permission.subject} Model
//                     </div>
//                 )),
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (_, record) => (
//                 <>
//                     <Button
//                         type="primary"
//                         onClick={() => onSelect(record)}
//                         className="me-2"
//                     >
//                         Edit
//                     </Button>
//                     <Button
//                         danger
//                         onClick={() => onDelete(record._id)}
//                     >
//                         Delete
//                     </Button>
//                 </>
//             ),
//         },
//     ];
//
//     return (
//         <Table
//             dataSource={routes}
//             columns={columns}
//             rowKey={(record) => record._id}
//             pagination={false}
//             className="table-striped table-hover"
//         />
//     );
// };
//
// export default RouteList;


import React from 'react';

const RouteList = () => {
    return (
        <div>
            ROUTE LIST
        </div>
    );
};

export default RouteList;