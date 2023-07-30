import React from 'react';
import {MDBBtn, MDBInput} from "mdb-react-ui-kit";

const Page6 = ({specification, handleSpecificationChange, error, index, removeSpecification}) => {
    console.log(error)
    return (
        <div className='row mb-3'>
            <div className="col-4">
                <MDBInput
                    name="name"
                    value={specification.name}
                    placeholder="eg RAM"
                    label='Specification name'
                    onChange={(e) => handleSpecificationChange(e, index)}
                />
            </div>
            <div className="col-4">
                <MDBInput
                    name="value"
                    value={specification.value}
                    placeholder="e.g 16 GB"
                    label='Specification value'
                    onChange={(e) => handleSpecificationChange(e, index)}
                />
            </div>
            <div className="col-4">
                <MDBBtn type="button" className='btn btn-danger' onClick={(e) => removeSpecification(e, index)}>Remove</MDBBtn>
            </div>
        </div>
    );
};

export default Page6;