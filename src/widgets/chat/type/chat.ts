export interface ChatRoomT {
  room_id: string;
  room_name: string;
  created_by: string;
}

export interface MessageT {
  chat_message_id: string;
  user_id: string;
  message: string;
  timestamp: string;
}
