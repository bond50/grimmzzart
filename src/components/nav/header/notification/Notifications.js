import React from "react";
import classes from "./Notifications.module.css";
import {Icon} from "@iconify/react";
import AdminDropDown from "../dropdown/AdminDropdwn";

const Notifications = () => {
    const notifications = [
        {
            icon: "bi:exclamation-circle",
            color: "text-warning",
            title: "Lorem Ipsum",
            message: "Quae dolorem earum veritatis oditseno",
            time: "30 min. ago"
        },
        {
            icon: "bi:x-circle",
            color: "text-danger",
            title: "Atque rerum nesciunt",
            message: "Quae dolorem earum veritatis oditseno",
            time: "1 hr. ago"
        },
        {
            icon: "bi:check-circle",
            color: "text-success",
            title: "Sit rerum fuga",
            message: "Quae dolorem earum veritatis oditseno",
            time: "2 hrs. ago"
        },
        {
            icon: "bi:info-circle",
            color: "text-primary",
            title: "Dicta reprehenderit",
            message: "Quae dolorem earum veritatis oditseno",
            time: "4 hrs. ago"
        }
    ];

    return (
        <AdminDropDown contentClass={classes.notifications} icon="bi:bell" badgeNumber={4} header={
            <>
                You have 4 new notifications
                <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
                </a>
            </>
        }>
            {notifications.map((notif, idx) => (
                <React.Fragment key={idx}>
                    <li>
                        <hr className={classes[`dropdown-divider`]}/>
                    </li>
                    <li className={classes[`notification-item`]}>
                        <Icon icon={notif.icon} className={`${notif.color} ${classes[`notification-item-icon`]}`}/>
                        <div>
                            <h4>{notif.title}</h4>
                            <p>{notif.message}</p>
                            <p>{notif.time}</p>
                        </div>
                    </li>
                </React.Fragment>
            ))}
            <li>
                <hr className={classes['dropdown-divider']}/>
            </li>
            <li className={`dropdown-footer ${classes['dropdown-footer']}`}>
                <a href="#">Show all notifications</a>
            </li>
        </AdminDropDown>
    );
};

export default Notifications;
