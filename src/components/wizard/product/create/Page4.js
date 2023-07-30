import React from 'react';
import {MDBInput} from "mdb-react-ui-kit";


const Page4 = ({powerRequirements, handleChange}) => {


    return (
        <>
            <MDBInput
                type="text"
                name="powerRequirements.voltage"
                className="form-control mb-3"
                value={powerRequirements.voltage}
                onChange={handleChange}
                label="voltage (e.g. 220V)"
            />

            <MDBInput
                type="text"
                label='amperage (e.g. 5A)'
                name="powerRequirements.amperage"
                className="form-control mb-3"
                value={powerRequirements.amperage}
                onChange={handleChange}

            />

            <MDBInput
                type="text"
                name="powerRequirements.frequency"
                className="form-control mb-3"
                value={powerRequirements.frequency}
                onChange={handleChange}
                label="Enter the frequency (e.g 50 Hz)"
            />

            <MDBInput
                type="text"
                name="powerRequirements.power"
                className="form-control mb-3"
                value={powerRequirements.power}
                onChange={handleChange}
                label="Enter the power e.g (120W)"
            />

            <MDBInput
                type="text"
                name="powerRequirements.batteryRequirements"
                className="form-control mb-3"
                value={powerRequirements.batteryRequirements}
                onChange={handleChange}
                label="Enter the battery requirements (e.g. 2 x AA)"
            />
            <MDBInput
                type="text"
                name="powerRequirements.powerManagementFeatures"
                className="form-control mb-3"
                value={powerRequirements.powerManagementFeatures}
                onChange={handleChange}
                label="Enter any power management features (e.g. Auto-off)"
            />

            <MDBInput
                type="text"
                name="powerRequirements.powerSupplyType"
                className="form-control mb-3"
                value={powerRequirements.powerSupplyType}
                onChange={handleChange}
                label="Enter the power supply type (e.g. AC)"
            />

            <MDBInput
                type="text"
                name="powerRequirements.plugType"
                className="form-control mb-3"
                value={powerRequirements.plugType}
                onChange={handleChange}
                label="Enter the plug type (e.g. Type C)"
            />


        </>
    );
};

export default Page4;

