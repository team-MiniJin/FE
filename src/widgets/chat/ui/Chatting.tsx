'use client';

import { useState } from 'react';
import ChatPage from './ChatPage';
import ChatRoom from './ChatRoom';
import { ChatRoomT } from '../type/chat';

export default function Chatting() {
  const [currentRoom, setCurrentRoom] = useState<ChatRoomT | null>(null);
  const [myChatRooms, setMyChatRooms] = useState<ChatRoomT[]>([]);

  const enterRoom = (room: ChatRoomT) => {
    const confirmEnter = window.confirm('채팅방에 참여하시겠습니까?');
    if (confirmEnter) {
      setCurrentRoom(room);
      if (!myChatRooms.some((r) => r.room_id === room.room_id)) {
        setMyChatRooms([...myChatRooms, room]);
      }
    }
  };

  const exitRoom = () => {
    setCurrentRoom(null);
  };

  const leaveRoomCompletely = (roomId: string) => {
    setMyChatRooms(myChatRooms.filter((room) => room.room_id !== roomId));
    setCurrentRoom(null);
  };

  return (
    <div className="relative w-full rounded-md bg-white py-10">
      {currentRoom ? (
        <ChatRoom
          room={currentRoom}
          onExit={exitRoom}
          onLeaveCompletely={leaveRoomCompletely}
        />
      ) : (
        <ChatPage enterRoom={enterRoom} myChatRooms={myChatRooms} />
      )}
    </div>
  );
}
