import React from 'react';
import {Link} from 'react-router-dom'
import classes from './Logo.module.css'
import SideBarToggle from "../SideBarToggle/SideBarToggle";


const Logo = ({clicked,SpanClass}) => {

    return (
        <div className={`${classes.Logo}  d-flex align-items-center justify-content-between`}>
            <Link to='/' className="d-flex align-items-center">
                <img src="/logo192.png" alt='Logo'/>
                <span className={`d-none d-lg-block ${classes.Span} ${SpanClass}`}>{process.env.REACT_APP_APPNAME}</span>
            </Link>
            <SideBarToggle clicked={clicked}/>
        </div>
    );
};

export default Logo;