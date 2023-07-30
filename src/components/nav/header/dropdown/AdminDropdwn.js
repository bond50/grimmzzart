import React, {useCallback, useEffect, useRef, useState} from 'react';
import classes from "./AdminDropdown.module.css";
import {Icon} from "@iconify/react";
import {useSelector} from "react-redux";

const AdminDropDown = ({
                           contentClass,
                           icon,
                           iconClass,
                           withProfile,
                           customDropClasses,
                           header,
                           children,
                           badgeNumber
                       }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    const {user: currentUser} = useSelector(state => state.auth)

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = useCallback((event) => {
        const target = event.target;
        const isClicked = target.closest(`.${contentClass}`);
        if (ref.current && !ref.current.contains(target) && !isClicked) {
            setIsOpen(false);
        }
    }, [contentClass]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <li className={`nav-item dropdown ${customDropClasses}`}>
            {withProfile ? (
                    <div className={`nav-link  ${classes['nav-profile']} d-flex align-items-center pe-0`} ref={ref}
                         onClick={toggle}>
                        <img src="/assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"/>
                        <span className="d-none d-md-block dropdown-toggle ps-2">
                            {currentUser && `${currentUser.surname.charAt(0)}. ${currentUser.firstName}`}
                        </span>

                    </div>

                ) :

                (<div className={`nav-link ${classes['nav-icon']}`} ref={ref} onClick={toggle}>
                    <Icon icon={icon} className={`{$classes['icon']} ${iconClass}`}/>
                    {badgeNumber &&
                    <span className={`badge bg-primary ${classes['badge-number']}`}>{badgeNumber}</span>}
                </div>)}


            <ul className={`dropdown-menu ${classes['dropdown-menu']} ${isOpen ? `${classes['show']} ${classes['dropdown-animate']}` : ''} dropdown-menu-end ${classes['dropdown-menu-arrow']} ${contentClass}`}>
                <li className={`dropdown-header ${classes['dropdown-header']}`}>
                    {header}
                </li>
                {children}

            </ul>
        </li>
    );
};

export default AdminDropDown;
