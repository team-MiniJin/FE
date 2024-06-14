'use client';

import { useState } from 'react';
import ChatPage from './ChatPage';
import ChatRoom from './ChatRoom';
import { ChatRoomT } from '../type/chat';

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<ChatRoomT | null>(null);
  const [myChatRooms, setMyChatRooms] = useState<ChatRoomT[]>([]);

  const enterRoom = (room: ChatRoomT) => {
    setCurrentRoom(room);
    if (!myChatRooms.some((r) => r.room_id === room.room_id)) {
      setMyChatRooms([...myChatRooms, room]);
    }
  };

  const exitRoom = () => {
    setCurrentRoom(null);
  };

  const leaveRoomCompletely = (roomId: string) => {
    setMyChatRooms(myChatRooms.filter((room) => room.room_id !== roomId));
    setCurrentRoom(null);
  };

  const handleExitChatPage = () => {
    setIsOpen(false);
    setCurrentRoom(null);
  };

  return (
    <>
      <button
        type="button"
        className="fixed bottom-5 right-5 rounded-full bg-blue-500 p-3 text-white shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        채팅
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-h- relative h-[90%] w-1/2 rounded-md bg-white p-10 shadow-lg">
            <button
              type="button"
              className="absolute right-5 top-3 text-2xl text-[--text-default-color] hover:text-[--brand-color]"
              onClick={handleExitChatPage}
            >
              x
            </button>
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
        </div>
      )}
    </>
  );
}
