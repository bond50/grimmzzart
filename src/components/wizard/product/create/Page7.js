import React from 'react';
import {MDBInput} from "mdb-react-ui-kit";

const Page7 = ({warranty,handleChange}) => {
    return (
        <>

                <MDBInput
                    type="number"
                    name="warranty.duration"
                    className="form-control mb-3"
                    value={warranty.duration}
                    onChange={handleChange}
                    label="Enter the warranty duration in months"
                />

                <label>Warranty Details</label>
                <MDBInput
                    type="text"
                    name="warranty.details"
                    className="form-control mb-3"
                    value={warranty.details}
                    onChange={handleChange}
                    label="Enter details about the warranty"
                />


        </>
    );
};

export default Page7;