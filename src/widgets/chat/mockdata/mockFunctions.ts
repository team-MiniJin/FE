import { chatRooms } from './chatRooms';
import { messages } from './messages';

export function createChatRoom(room_name: string, created_by: string) {
  const newRoom = {
    room_id: `${created_by} : ${room_name}`,
    room_name,
    created_by,
  };
  chatRooms.push(newRoom);
  return newRoom;
}

export function getChatRooms() {
  return chatRooms;
}

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

export function deleteMessage(chat_room_id: string, message_id: string) {
  const delMessage = messages[chat_room_id].filter(
    (message) => message.chat_message_id === message_id
  );
  messages[chat_room_id] = messages[chat_room_id].filter(
    (message) => message.chat_message_id !== message_id
  );

  return delMessage;
}

export function getMessages(chat_room_id: string) {
  return messages[chat_room_id] || [];
}
