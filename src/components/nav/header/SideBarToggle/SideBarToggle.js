import React from 'react';
import {Icon} from "@iconify/react";
import classes from './SideBarToggle.module.css'

const SideBarToggle = ({clicked}) => {
    return (
        <Icon
            icon="bi:list"
            className={classes.ToggleButton}
            fontSize={18}
            onClick={clicked}
        />
    );
};

export default SideBarToggle;