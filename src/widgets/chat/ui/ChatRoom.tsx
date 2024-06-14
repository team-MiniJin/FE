'use client';

import { useState, useEffect } from 'react';
import {
  getMessages,
  addMessage,
  deleteMessage,
} from '../mockdata/mockFunctions';
import { ChatRoomT, MessageT } from '../type/chat';

interface ChatRoomProps {
  room: ChatRoomT;
  onExit: () => void;
  onLeaveCompletely: (roomId: string) => void;
}

export default function ChatRoom({
  room,
  onExit,
  onLeaveCompletely,
}: ChatRoomProps) {
  const [messages, setMessages] = useState<MessageT[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('myNickname');

  useEffect(() => {
    const roomMessages = getMessages(room.room_id);
    setMessages(
      roomMessages.map((msg: MessageT) => ({
        chat_message_id: msg.chat_message_id,
        user_id: msg.user_id,
        message: msg.message,
        timestamp: msg.timestamp,
      }))
    );
  }, [room.room_id]);

  const sendMessage = () => {
    if (newMessage) {
      const newChatMessage = addMessage(room.room_id, currentUser, newMessage);
      setMessages([...messages, newChatMessage]);
      setNewMessage('');
    }
  };

  const cancelMessage = (message_id: string) => {
    deleteMessage(room.room_id, message_id);
    setMessages(
      messages.filter((message) => message.chat_message_id !== message_id)
    );
  };

  const handleLeaveCompletely = (roomId: string) => {
    if (window.confirm('채팅방을 나가시겠습니까?')) {
      onLeaveCompletely(roomId);
    }
  };

  return (
    <div className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">{room.room_name}</h2>
        <div>
          <button
            type="button"
            className="mr-2 bg-red-500 p-2 text-white"
            onClick={onExit}
          >
            뒤로가기
          </button>
          <button
            type="button"
            className="bg-red-700 p-2 text-white"
            onClick={() => handleLeaveCompletely(room.room_id)}
          >
            채팅방 나가기
          </button>
        </div>
      </div>
      <div className="mb-4 h-[calc(100%-6rem)] overflow-y-scroll border p-4">
        {messages.map((message, i) => {
          const showUserId =
            message.user_id !== currentUser &&
            (i === 0 || messages[i - 1].user_id !== message.user_id);
          const currentDate = new Date(message.timestamp).toLocaleDateString();
          const previousDate =
            i === 0
              ? ''
              : new Date(messages[i - 1].timestamp).toLocaleDateString();
          return (
            <div key={message.chat_message_id}>
              {currentDate !== previousDate && (
                <div className="mb-2 flex items-center">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="mx-2 text-gray-500">
                    {new Date(message.timestamp).toLocaleDateString('ko-KR', {
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>
              )}
              <div
                className={`mb-2 flex flex-col ${message.user_id === currentUser ? 'items-end' : 'items-start'}`}
              >
                {showUserId && (
                  <strong className="block text-gray-500">
                    {message.user_id}
                  </strong>
                )}
                <div
                  className={`inline-block rounded-2xl p-2 shadow-md ${message.user_id === currentUser ? 'bg-[#FFF494] text-black' : 'bg-gray-100 text-black'}`}
                  style={{
                    maxWidth: '75%',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  <span className="block">{message.message}</span>
                  <span className="mt-1 block text-xs text-gray-400">
                    (
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    )
                  </span>
                  {message.user_id === currentUser && (
                    <button
                      type="button"
                      className="ml-2 text-xs text-red-500"
                      onClick={() => cancelMessage(message.chat_message_id)}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full">
        <input
          className="flex-grow border p-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력해주세요"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          type="button"
          className="ml-2 bg-blue-500 p-2 text-white"
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
}
