import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = ({clicked, show}) => {
    let backdrop = null;
    if (show) {
        backdrop = (
            <div className={classes.backdrop}
                onClick={clicked}>
            </div>
        );
    }
    return backdrop;
};

export default Backdrop;