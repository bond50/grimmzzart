import React from 'react';

import classes from '../aside.module.css'
import {useSelector} from "react-redux";
import SideLink from "../link/SideLink";


const AdminContent = () => {
    const {user: currentUser} = useSelector((state) => state.auth);


    return (
        <>
            {currentUser && <li className={classes.NavHeading}>{`${currentUser.surname}`} </li>}
            <SideLink href='/admin/product' icon='eos-icons:product-classes-outlined' title='Add Product'/>
            <SideLink href='/admin/products' icon='eos-icons:products-outlined' title='Products'/>
            <SideLink href='/admin/category' icon='icon-park-outline:difference-set' title='Category'/>
            <SideLink href='/admin/sub' icon='icon-park-outline:add-subset' title='Sub category'/>
            <SideLink href='/admin/coupon' icon='icon-park-outline:coupon' title='Coupon'/>
            <SideLink href='/admin/user-management' icon='fluent-mdl2:account-management' title='User Management'/>
            <SideLink href='/admin/roles' icon='fluent-mdl2:account-management' title='Roles '/>
            <SideLink href='/admin/permissions' icon='fluent-mdl2:account-management' title='Permissions '/>
            <SideLink href='/admin/custom-routes' icon='fluent-mdl2:account-management' title='Routes '/>

        </>
    );
};

export default AdminContent;