// src/components/permissions/PermissionForm.js
import React, {useEffect, useState} from 'react';
import {MDBBtn, MDBInput} from 'mdb-react-ui-kit';

const PermissionForm = ({permission, onSubmit, onCancel}) => {
    const [action, setAction] = useState(permission.action);
    const [subject, setSubject] = useState(permission.subject);
    const [description, setDescription] = useState(permission.description);

    useEffect(() => {
        setAction(permission.action);
        setSubject(permission.subject);
        setDescription(permission.description);
    }, [permission]);
    return (
        <form onSubmit={onSubmit}>
            <div className="container">
                <MDBInput
                    className="mb-3"
                    label="Action"
                    id="action"
                    type="text"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    required
                />
                <MDBInput
                    className="mb-3"
                    label="Subject"
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
                <MDBInput
                    className="mb-3"
                    label="Description"
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="d-flex justify-content-between mt-3">
                    <MDBBtn color="primary" type="submit">
                        Save
                    </MDBBtn>
                    <MDBBtn color="danger" onClick={onCancel}>
                        Cancel
                    </MDBBtn>
                </div>
            </div>
        </form>

    );
};

export default PermissionForm;
