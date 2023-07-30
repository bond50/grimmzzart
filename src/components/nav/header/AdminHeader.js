import React from 'react';
import classes from './AdminHeader.module.css'

import AdminSearch from "./search/AdminSearch";
import Notifications from "./notification/Notifications";
import Messages from "./messages/Messages";
import Profile from "./profile/Profile";
import Logo from "./Logo/Logo";
import SearchIcon from "./search/SearchIcon";

function AdminHeader({clicked}) {

    return (
        <header className={`${classes[`header`]} fixed-top d-flex align-items-center`}>
            <Logo SpanClass={classes.Span} clicked={clicked}/>
            <AdminSearch/>
            <nav className={`${classes[`header-nav`]} ms-auto`}>
                <ul className={`d-flex align-items-center ${classes['header-nav-items']}`}>
                    <SearchIcon/>
                    <Notifications/>
                    <Messages/>
                    <Profile/>

                </ul>
            </nav>

        </header>
    );
}

export default AdminHeader;
