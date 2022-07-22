import "./UserList.styles.scss";

import { Avatar } from "../Avatar";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";


export function UserList(props) {
    const findMe = useUser();

    const [active, setActive] = useState(false)

    let userList = props.memberList.map((member) => {
        return (
            <li key={member.id} className={`user-list__item ${findMe.user.avatarBackgroundColor === member.clientData.avatarColor ? 'active' : ''}`}><Avatar text={member.clientData.avatarText} backgroundColor={member.clientData.avatarColor}/> <span className="user-list__item-name">{member.clientData.displayName}</span></li>
        )
    })

    const handleClick = () => {
        setActive(!active);
    }



    return (
        <>
            <div className={`user-list ${active === true ? 'active' : ''}`}>
                <span className={`user-list__button ${active === true ? 'active' : ''}`} onClick={handleClick}>
                    <span className="user-list__button-bar"></span>
                    <span className="user-list__button-bar"></span>
                    <span className="user-list__button-bar"></span>
                </span>
                <span className="user-list__title">User List</span>
                <ul className="user-list__list">
                    {userList}
                </ul>
            </div>
        </>
    )
}