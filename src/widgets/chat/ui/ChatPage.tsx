'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { GoPlus } from 'react-icons/go';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/shared';
import { getChatRooms, createChatRoom } from '../mockdata/mockFunctions';
import { ChatRoomT } from '../type/chat';
import CreateRoom from './CreateRoom';

interface ChatPageProps {
  enterRoom: (room: ChatRoomT) => void;
  myChatRooms: ChatRoomT[];
}

export default function ChatPage({ enterRoom, myChatRooms }: ChatPageProps) {
  const [chatRooms, setChatRooms] = useState<ChatRoomT[]>([]);
  const [newRoomTitle, setNewRoomTitle] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('my');
  const [showModal, setShowModal] = useState<boolean>(false); // 채팅방 생성 창
  const [keyword, setKeyword] = useState<string>(''); // 채팅방 검색어

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
      setShowModal(false);
    }
  };

  const displayRooms = activeTab === 'my' ? myChatRooms : chatRooms;
  const filteredRooms = displayRooms.filter((room) =>
    room.room_name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center justify-center border-b py-4 ">
        <div className="mr-auto flex">
          <Button
            type="button"
            variant="outline"
            className={`rounded-r-[0px] p-2 ${activeTab === 'my' ? 'text-[--brand-main-color]' : ''}`}
            onClick={() => setActiveTab('my')}
          >
            내 채팅
          </Button>
          <Button
            type="button"
            variant="outline"
            className={`rounded-l-[0px] p-2 ${activeTab === 'all' ? 'text-[--brand-main-color]' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            전체 채팅
          </Button>
        </div>
        <div className="mr-4 flex items-center py-4">
          <SearchBar
            type="text"
            placeholder="채팅방 검색"
            value={keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.target.value)
            }
          />
        </div>
        <Button variant="outline" onClick={() => setShowModal(true)}>
          <GoPlus className="mr-2" />새 채팅
        </Button>
        {showModal && (
          <CreateRoom
            newRoomTitle={newRoomTitle}
            setNewRoomTitle={setNewRoomTitle}
            createRoom={createRoom}
            setShowModal={setShowModal}
          />
        )}
      </div>
      <ul className="flex h-full flex-col items-center overflow-auto">
        {filteredRooms.length === 0 ? (
          <li className="flex h-28 w-full items-center justify-center border-b">
            <span className="text-gray-500">채팅방에 참여해보세요.</span>
          </li>
        ) : (
          filteredRooms.map((room) => (
            <li key={room.room_id} className="h-28 w-full border-b">
              <button
                type="button"
                className="h-full w-full bg-white p-4 text-left font-bold hover:bg-gray-100"
                onClick={() => enterRoom(room)}
              >
                {room.room_name}
              </button>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
