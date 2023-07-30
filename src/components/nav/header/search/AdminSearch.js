import React from 'react';
import classes from "./AdminSearch.module.css";
import {Icon} from "@iconify/react";

const AdminSearch = () => {
    return (
        <div className={classes[`search-bar`]}>
                <form className={`${classes['search-form']} d-flex align-items-center`}>
                    <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
                    <button type="submit" title="Search">
                        <Icon icon="bi:search" className={classes['search-form-icon']}/>
                    </button>
                </form>
            </div>

    );
};

export default AdminSearch;