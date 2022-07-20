import "./Message.styles.scss";

import { Avatar } from "../Avatar";
import { MessageText } from "../MessageText";
import { useUser } from "../../contexts/UserContext";

export function Message(props) {

  const user = useUser();


  return (
    <div className={`message ${user.user.displayName === props.displayName ? 'my-messages' : ''}`}>
      <div className="message__avatar">
        <Avatar
          backgroundColor={props.avatarBackgroundColor}
          text={props.avatarText}
        />
      </div>
      <div className="message__text">
        <MessageText
          displayName={props.displayName}
          time={props.time}
        >
          {props.children}
        </MessageText>
      </div>
    </div>
  );
}
