import React from 'react';
import classes from './sideLink.module.css'
import {Link} from "react-router-dom";
import { Icon } from '@iconify/react';
const SideLink = ({href, title, icon}) => {
    return (
        <li className={`${classes.SidebarListItem}  nav-item`}>
            <Link to={href} className={`${classes.NavLink} `}>
                <Icon icon={icon} className={classes.Icon}/>
                <span>{title}</span>
            </Link>
        </li>
    );
};

export default SideLink;