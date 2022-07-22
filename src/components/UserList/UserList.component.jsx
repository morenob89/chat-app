import { Avatar } from "../Avatar";
import "./UserList.styles.scss";
import { useState } from "react";


export function UserList(props) {

    const [active, setActive] = useState(false)

    let userList = props.memberList.map((member) => {
        return (
            <li key={member.id} className="user-list__item"><Avatar text={member.clientData.avatarText} backgroundColor={member.clientData.avatarColor}/> <span className="user-list__item-name">{member.clientData.displayName}</span></li>
        )
    })

    const handleClick = () => {
        console.log('click');
        setActive(!active);
        
    }
    console.log(active);


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