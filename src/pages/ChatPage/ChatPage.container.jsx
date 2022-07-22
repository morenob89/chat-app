import "./ChatPage.styles.scss";

import { Message as MessageModel } from "../../models/Message";
import { useUser } from "../../contexts/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import { ChatPage as Component } from "./ChatPage.component";

export function ChatPage() {
  const {user} = useUser();
  const [state, setState] = useState([]);
  const [drone, setDrone] = useState(null);
  const [error, setError] = useState(null);
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [memberList, setMemberList] = useState({});

  const sendMessage = (formState) => {
    const message = new MessageModel({
      messageText: formState.message,
      user,
    });

    if (drone !== null) {
      drone.publish({
        room: 'observable-chat',
        message: message
      });
    }
  }



  useEffect(() => {
    if (drone !== null) return;
    setDrone(new window.Scaledrone('dBIV1z4GVivgxfIh', {
      data: {
        displayName: user.displayName,
        avatarColor: user.avatarBackgroundColor,
        avatarText: user.avatarText,
      }
    }));
  }, [drone, setDrone, user]);

  useEffect(() => {
    if (drone === null) return;

    const room = drone.subscribe('observable-chat');

    room.on('open', error => {
      if (error) {
        return setError(error);
      }
      setJoinedRoom(true);
      console.log('connected to the room')
    });

    room.on('members', function(members) {
      setMemberList(members);
    });

    room.on('member_join', function(member) {
      console.log(`${member.clientData.displayName} has joined the room`);
      setMemberList((state) => [
        ...state, member
      ]);
    });
    
    room.on('member_leave', function(member) {
      console.log(`${member.clientData.displayName} has left the room`);
      
      setMemberList((state) => state.filter((person) => {
        return person.id !== member.id;
      }));
    });
  
    room.on('message', message => {

      setState((state) => [
        ...state,
        MessageModel.fromObject({ ...message.data, id: message.id })
      ]);
    });
  }, [drone]);

  return (
    <Component
      messages={state}
      onSendMessage={sendMessage}
      error={error}
      joinedRoom={joinedRoom}
      memberList={memberList}
    />
  );
}