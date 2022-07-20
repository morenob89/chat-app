import "./Message.styles.scss";

import { Avatar } from "../Avatar";
import { MessageText } from "../MessageText";

export function Message(props) {
  return (
    <div className="message">
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
