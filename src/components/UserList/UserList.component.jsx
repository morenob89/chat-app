import { Avatar } from "../Avatar";
import "./UserList.styles.scss";


export function UserList(props) {
        let userList = props.memberList.map((member) => {
            return (
                <li key={member.id} className="user-list__item"><Avatar text={member.clientData.avatarText} backgroundColor={member.clientData.avatarColor}/> <span className="user-list__item-name">{member.clientData.displayName}</span></li>
            )
        })

    return (
        <>
            <div className="user-list">
                <span className="user-list__title">User List</span>
                <ul className="user-list__list">
                    {userList}
                </ul>
            </div>
        </>
    )
}