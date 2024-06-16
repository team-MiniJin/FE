import { chatRooms } from './chatRooms';
import { messages } from './messages';

// 채팅방 생성
export function createChatRoom(room_name: string, created_by: string) {
  const newRoom = {
    room_id: `${created_by}:${room_name}`,
    room_name,
    created_by,
  };
  chatRooms.push(newRoom);
  return newRoom;
}

// 채팅방 삭제
export function deleteChatRoom(room_id: string) {
  const roomIndex = chatRooms.findIndex((room) => room.room_id === room_id);
  chatRooms.splice(roomIndex, 1);
  delete messages[room_id];
}

// 채팅방 목록 조회
export function getChatRooms() {
  return chatRooms;
}

//  메시지 추가
export function addMessage(
  chat_room_id: string,
  user_id: string,
  message: string
) {
  const newMessage = {
    chat_message_id: (
      Object.keys(messages).flatMap((key) => messages[key]).length + 1
    ).toString(),
    user_id,
    message,
    timestamp: new Date().toISOString(),
  };
  if (!messages[chat_room_id]) {
    messages[chat_room_id] = [];
  }
  messages[chat_room_id].push(newMessage);
  return newMessage;
}

// 메시지 삭제
export function deleteMessage(chat_room_id: string, message_id: string) {
  messages[chat_room_id] = messages[chat_room_id].filter(
    (message) => message.chat_message_id !== message_id
  );
}

// 채팅방의 메시지 불러오기
export function getMessages(chat_room_id: string) {
  return messages[chat_room_id] || [];
}
