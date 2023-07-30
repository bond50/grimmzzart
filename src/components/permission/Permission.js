// src/components/permissions/Permission.js
import React, {useState} from 'react';
import {MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody} from 'mdb-react-ui-kit';
import {deletePermission} from '../../services/permission.service';

import {useSelector} from "react-redux";

const Permission = ({permissionId, onDelete}) => {
    const [modal, setModal] = useState(false);
    const {token} = useSelector(state => state.auth.user)

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleDelete = async () => {
        try {
            await deletePermission(token, permissionId);
            onDelete(permissionId);
        } catch (error) {
            console.error('Error deleting permission:', error);
        } finally {
            toggleModal();
        }
    };

    return (
        <>
            <MDBBtn tag="a" color="danger" size="sm" onClick={toggleModal}>
                Delete
            </MDBBtn>

            <MDBModal show={modal} tabIndex="-1">
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <h5 className="modal-title">Delete Permission</h5>
                            <MDBBtn
                                className="btn-close"
                                color="none"
                                onClick={toggleModal}
                            />
                        </MDBModalHeader>
                        <MDBModalBody>
                            <p>Are you sure you want to delete this permission?</p>
                        </MDBModalBody>
                        <div className="d-flex justify-content-end p-4">
                            <MDBBtn color="danger" onClick={handleDelete}>
                                Delete
                            </MDBBtn>
                            <MDBBtn color="secondary" onClick={toggleModal}>
                                Cancel
                            </MDBBtn>
                        </div>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default Permission;
