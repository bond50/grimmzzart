import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Outlet, useLocation, useParams} from 'react-router-dom';


import Header from "../../components/nav/header/AdminHeader";
import useToggle from '../../hooks/useToggle';

import classes from './Layout.module.css';
import Aside from "../../components/nav/aside/Aside";
import Footer from "../../components/footer/Footer";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";


const Layout = () => {
    const [open, toggleOpen] = useToggle();

    let attachedClasses = [classes.Main];
    if (open) {
        attachedClasses = [classes.Main, classes.Close];
    }

    return (
        <>
            <Header clicked={toggleOpen}/>
            <Aside open={open}/>
            <main className={attachedClasses.join('')}>
                <Breadcrumb/>
                <Outlet/>
            </main>
            {/*<Footer/>*/}
        </>
    );
};

export default Layout;
