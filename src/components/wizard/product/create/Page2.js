import React from 'react';
import {MDBInput} from "mdb-react-ui-kit";

import './Page.css'

const Page2 = ({title, price, displayTitle, quantity, error, color, handleChange}) => {


    const getErrorStyle = (error) => error ? { border: '1px solid red' } : {};

    return (
        <>
              <div className={`mb-3`}>
                <MDBInput
                    type="text"
                    name="title"
                    label='Title*'
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                    required
                />
                {error.title && <p className="text-danger">{error.title}</p>}
            </div>
            <div className='mb-3'>
                <MDBInput
                    type="text"
                    name="displayTitle"
                    label='Display Title*'
                    placeholder='e.g Vitron Smart 32" FRAMELESS Android TV HTC3200S Netflix & Youtube.'
                    className="form-control"
                    value={displayTitle}
                    onChange={handleChange}


                    required
                />
                {error.displayTitle && <p className="text-danger">{error.displayTitle}</p>}
            </div>

            <div className='mb-3'>
                <MDBInput
                    type="text"
                    name="price"
                    className="form-control mb-3"
                    value={price}
                    onChange={handleChange}
                    required


                    label="Price*"
                />
                {error.price && <p className="text-danger">{error.price}</p>}
            </div>
            <div className='mb-3'>
                <MDBInput
                    type="text"
                    name="quantity"
                    className="form-control mb-3"
                    value={quantity}
                    onChange={handleChange}
                    required


                    label="Quantity*"
                />
                {error.quantity && <p className="text-danger">{error.quantity}</p>}
            </div>
            <div className='mb-3'>
                <MDBInput
                    type="text"
                    name="color"
                    className="form-control mb-3"
                    value={color}
                    onChange={handleChange}
                    required
                    label="Color*"
                />
                {error.color && <p className="text-danger">{error.color}</p>}
            </div>
        </>
    );
};

export default Page2;