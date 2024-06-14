'use client';

import { useState, useEffect } from 'react';
import { getChatRooms, createChatRoom } from '../mockdata/mockFunctions';
import { ChatRoomT } from '../type/chat';

interface ChatPageProps {
  enterRoom: (room: ChatRoomT) => void;
  myChatRooms: ChatRoomT[];
}

export default function ChatPage({ enterRoom, myChatRooms }: ChatPageProps) {
  const [chatRooms, setChatRooms] = useState<ChatRoomT[]>([]);
  const [newRoomTitle, setNewRoomTitle] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('my');

  useEffect(() => {
    const rooms = getChatRooms();
    setChatRooms(
      rooms.map((room) => ({
        room_id: room.room_id,
        room_name: room.room_name,
        created_by: room.created_by,
      }))
    );
  }, []);

  const createRoom = () => {
    if (newRoomTitle) {
      const newRoom = createChatRoom(newRoomTitle, 'myNickname');
      setChatRooms([...chatRooms, newRoom]);
      setNewRoomTitle('');
      enterRoom(newRoom);
    }
  };

  const displayRooms = activeTab === 'my' ? myChatRooms : chatRooms;

  return (
    <>
      <div className="mb-4 flex">
        <h1 className="mr-6 h-10 text-2xl font-bold leading-10">채팅</h1>
        <button
          type="button"
          className="bg-blue-500 p-2 text-white"
          onClick={createRoom}
        >
          새 채팅
        </button>
        <input
          className="w-full max-w-xs border p-2"
          value={newRoomTitle}
          onChange={(e) => setNewRoomTitle(e.target.value)}
          placeholder="채팅방 이름을 입력해주세요"
        />
      </div>
      <ul className="flex h-full max-h-[75%] flex-col items-center overflow-auto">
        {displayRooms.map((room) => (
          <li key={room.room_id} className="w-[80%]">
            <button
              type="button"
              className="h-20 w-full bg-white p-4 text-left font-bold shadow hover:opacity-50"
              onClick={() => enterRoom(room)}
            >
              {room.room_name}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className={`ml-2 p-2 ${activeTab === 'my' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('my')}
        >
          내 채팅
        </button>
        <button
          type="button"
          className={`p-2 ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('all')}
        >
          전체 채팅방
        </button>
      </div>
    </>
  );
}
