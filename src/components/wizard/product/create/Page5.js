import React from 'react';
import {MDBInput} from "mdb-react-ui-kit";

const Page5 = ({dimensions, handleChange}) => {

    return (
        <>

            <MDBInput
                type="number"
                name="dimensions.length"
                className="form-control mb-3"
                value={dimensions.length}
                onChange={handleChange}
                label="Enter the length in cm"
            />

            <MDBInput
                type="number"
                name="dimensions.width"
                className="form-control mb-3"
                value={dimensions.width}
                onChange={handleChange}
                label="Enter the width in cm"
            />


            <MDBInput
                type="number"
                name="dimensions.height"
                className="form-control mb-3"
                value={dimensions.height}
                onChange={handleChange}
                label="Enter the height in cm"
            />

            <MDBInput
                type="number"
                name="dimensions.weight"
                className="form-control mb-3"
                value={dimensions.weight}
                onChange={handleChange}
                label="Enter the weight in kg"
            />

        </>
    );
};

export default Page5;