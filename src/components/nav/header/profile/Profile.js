import React, {useCallback} from "react";
import AdminDropDown from "../dropdown/AdminDropdwn";
import classes from "./Profile.module.css";
import {Icon} from "@iconify/react";
import {useSelector, useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../../../../redux/slices/auth";


const Profile = () => {

    const {user: currentUser} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use useNavigate hook to get the navigate function

    const handleLogout = useCallback(async () => {
        await dispatch(logout()); // Await the logout dispatch
        navigate('/login'); // Navigate to /login after logging out
    }, [dispatch, navigate]);

    const profileItems = [
        {
            icon: "healthicons:ui-user-profile-outline",
            link: "/profile",
            text: "My Profile"
        },
        {
            icon: "ph:gear-thin",
            link: "/account",
            text: "Account Settings"
        },
        {
            icon: "formkit:help",
            link: "/help",
            text: "Need Help?"
        },
        {
            icon: "bi:box-arrow-right",
            text: "Sign Out",
            action: handleLogout

        }
    ];


    return (
        <AdminDropDown
            customDropClasses='pe-3'
            contentClass={classes.profile}
            withProfile={true}
            header={
                <div className={classes['profile-dropdown-header']}>
                    <h6>{`${currentUser && currentUser.firstName} ${currentUser && currentUser.surname}`}</h6>
                    <span>Super user</span>
                </div>
            }>
            {profileItems.map((item, idx) => (
                <React.Fragment key={idx}>
                    <li>
                        <hr className={classes[`dropdown-divider`]}/>
                    </li>
                    <li>
                        <Link
                            className={`dropdown-item ${classes['dropdown-item']} d-flex align-items-center`}
                            to={item.link}
                            onClick={item.action} // Use onClick handler if item has an action
                        >
                            <Icon icon={item.icon} className={classes.icon}/>
                            <span>{item.text}</span>
                        </Link>
                    </li>
                </React.Fragment>
            ))}
        </AdminDropDown>
    );
};

export default Profile;
