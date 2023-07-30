import React from "react";
import classes from "./Messages.module.css";
import AdminDropDown from "../dropdown/AdminDropdwn";

const Messages = () => {
    const messages = [
        {
            imgSrc: "/assets/img/messages-1.jpg",
            name: "Maria Hudson",
            message: "Velit asperiores et ducimus soluta repudiandae labore officia est ut...",
            time: "4 hrs. ago"
        },
        {
            imgSrc: "/assets/img/messages-2.jpg",
            name: "Anna Nelson",
            message: "Velit asperiores et ducimus soluta repudiandae labore officia est ut...",
            time: "6 hrs. ago"
        },
        {
            imgSrc: "/assets/img/messages-3.jpg",
            name: "David Muldon",
            message: "Velit asperiores et ducimus soluta repudiandae labore officia est ut...",
            time: "8 hrs. ago"
        }
    ];

    return (
        <AdminDropDown contentClass={classes.messages} icon="material-symbols:chat-outline" badgeNumber={7} header={
            <>
                You have 3 new messages
                <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
                </a>
            </>
        }>
            {messages.map((msg, idx) => (
                <React.Fragment key={idx}>
                    <li>
                        <hr className={classes[`dropdown-divider`]}/>
                    </li>
                    <li className={classes[`message-item`]}>
                        <a href="#">
                            <img src={msg.imgSrc} alt="" className="rounded-circle"/>
                            <div>
                                <h4>{msg.name}</h4>
                                <p>{msg.message}</p>
                                <p>{msg.time}</p>
                            </div>
                        </a>
                    </li>
                </React.Fragment>
            ))}
            <li>
                <hr className={classes[`dropdown-divider`]}/>
            </li>

            <li className={`dropdown-footer ${classes['dropdown-footer']}`}>
                <a href="#">Show all messages</a>
            </li>
        </AdminDropDown>
    );
};

export default Messages;
