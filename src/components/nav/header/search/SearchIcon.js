import React from 'react';
import classes from "./SearchIcon.module.css";
import { Icon } from '@iconify/react';

const SearchIcon = () => {
    return (
        <li className="nav-item d-block d-lg-none">
            <div className={`nav-link ${classes['nav-icon']} search-bar-toggle`}>
                <Icon icon="bi:search" />
            </div>
        </li>
    );
};

export default SearchIcon;