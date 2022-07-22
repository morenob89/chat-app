import "./ChatPage.styles.scss";

import { Message } from "../../components/Message";
import { MessageForm } from "../../components/MessageForm";
import { useEffect, useRef } from "react";
import { useUser } from "../../contexts/UserContext";
import { UserList } from "../../components/UserList/";

export function ChatPage(props) {
  console.log(props.memberList);
  const findMe = useUser();

  let messageList = useRef();

  useEffect(() => {
    let value = messageList.current;
    if(value) {
      value.scrollTop = value.scrollHeight;
    }
  },[props.messages])

  if (props.error !== null) {
    return (
      <div className="chat-page">Failed to connect to chat room.</div>
    );
  }

  if (!props.joinedRoom) {
    return (
      <div className="chat-page">Joining room, please wait...</div>
    );
  }

  const messageItems = props.messages.map((message) => (
    <div key={message.id} className={`chat-page__message-list-item ${findMe.user.displayName === message.user.displayName ? 'find-me' : ''}`} >
      <Message
        avatarBackgroundColor={message.user.avatarBackgroundColor}
        avatarText={message.user.avatarText}
        displayName={message.user.displayName}
        time={message.displayCreatedAt()}
      >
        {message.messageText}
      </Message>
    </div>
  ));

  return (
    <div className="chat-page">
      <UserList memberList={props.memberList}/>
      <div className="chat-page__title">Chat with friends</div>
      <div ref={messageList} className="chat-page__message-list">
        {messageItems}
      </div>
      <div className="chat-page__form">
        <MessageForm onSend={props.onSendMessage} />
      </div>
    </div>
  );
}