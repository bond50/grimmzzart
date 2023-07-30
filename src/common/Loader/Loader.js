import React from 'react'
import classes from './Loader.module.css'

const Loader = () => {
    return (
        <div className={classes.wrapper}>
            <span className={classes.loader}/>
            <div className='mt-5 fw-bold'>
                Shopping Cart - 2019-2020, All Rights Reserved
            </div>
        </div>
    )
}

export default Loader
