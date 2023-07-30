import React, {useCallback, useEffect, useState} from 'react';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBBtn,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink,
    MDBInput,
    MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter
} from 'mdb-react-ui-kit';
import './PermissionList.css'

import {getPermissionsWithPagination} from '../../services/permission.service';
import Permission from './Permission';
import {useSelector} from 'react-redux';
import PermissionForm from "./PermissionForm";

const PermissionsList = () => {
    const [permissions, setPermissions] = useState([]);
    const [page, setPage] = useState(1);
    const [editedPermission, setEditedPermission] = useState(null);

    const [limit] = useState(10);
    const [search, setSearch] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const {token} = useSelector((state) => state.auth.user);

    const loadPermissions = useCallback(
        async (search, page) => {
            try {
                const {data} = await getPermissionsWithPagination(token, search, page, limit);
                setPermissions(data.data);
                setTotalCount(data.totalCount);
            } catch (error) {
                console.error('Error loading permissions:', error);
            }
        },
        [token, limit]
    );

    useEffect(() => {
        loadPermissions(search, page);
    }, [loadPermissions, search, page]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };
    const handleEdit = (permission) => {
        setEditedPermission(permission);
    };


    const deletePermissionById = (id) => {
        setPermissions(permissions.filter((permission) => permission._id !== id));
    };

    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="container">
            <h1 className="my-4">Permissions</h1>
            <MDBInput
                label="Search"
                id="search"
                type="text"
                value={search}
                onChange={handleSearch}
            />
            <MDBTable hover>
                <MDBTableHead>
                    <tr>
                        <th>Action</th>
                        <th>Subject</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {permissions.map((permission) => (
                        <tr key={permission._id}>
                            <td>{permission.action}</td>
                            <td>{permission.subject}</td>
                            <td>{permission.description}</td>
                            <td>
                                <MDBBtn tag="a" color="warning" size="sm" onClick={() => handleEdit(permission)}>
                                    Edit
                                </MDBBtn>

                            </td>
                            <td>
                                <div>
                                    <MDBModalBody className="p-4">
                                        {editedPermission ? (
                                            <PermissionForm permission={editedPermission}/>
                                        ) : null}
                                    </MDBModalBody>

                                </div>

                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
            <MDBPagination className="my-4">
                <MDBPaginationItem disabled={page <= 1}>
                    <MDBPaginationLink
                        first
                        onClick={() => setPage(1)}
                    />
                </MDBPaginationItem>
                <MDBPaginationItem disabled={page <= 1}>
                    <MDBPaginationLink
                        previous
                        onClick={() => setPage(page - 1)}
                    />
                </MDBPaginationItem>
                {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
                    <MDBPaginationItem key={p} active={p === page}>
                        <MDBPaginationLink
                            onClick={() => setPage(p)}
                        >
                            {p}
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                ))}
                <MDBPaginationItem disabled={page >= totalPages}>
                    <MDBPaginationLink
                        next
                        onClick={() => setPage(page + 1)}
                    />
                </MDBPaginationItem>
                <MDBPaginationItem disabled={page >= totalPages}>
                    <MDBPaginationLink
                        last
                        onClick={() => setPage(totalPages)}
                    />
                </MDBPaginationItem>
            </MDBPagination>
            <MDBModal show={editedPermission !== null} onHide={() => setEditedPermission(null)}>
                <MDBModalHeader>Edit Permission</MDBModalHeader>
                <MDBModalBody>
                    {editedPermission ? (
                        <PermissionForm permission={editedPermission}/>
                    ) : null}
                </MDBModalBody>


                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={() => setEditedPermission(null)}>
                        Close
                    </MDBBtn>
                    <MDBBtn color="primary">Save changes</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </div>
    );
};

export default PermissionsList;