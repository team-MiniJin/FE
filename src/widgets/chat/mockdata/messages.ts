interface Message {
  chat_message_id: string;
  user_id: string;
  message: string;
  timestamp: string;
}

export const messages: Record<string, Message[]> = {
  'user1:title1': [
    {
      chat_message_id: '1',
      user_id: 'user1',
      message: '안녕하세요',
      timestamp: '2024-05-01T12:00:00Z',
    },
    {
      chat_message_id: '2',
      user_id: 'user2',
      message: '안녕하세요!',
      timestamp: '2024-05-01T12:01:00Z',
    },
    {
      chat_message_id: '3',
      user_id: 'user2',
      message: '반갑습니다.',
      timestamp: '2024-05-01T12:02:00Z',
    },
  ],
  'user2:title2': [
    {
      chat_message_id: '4',
      user_id: 'user3',
      message: 'ㅎㅇ',
      timestamp: '2024-05-01T13:00:00Z',
    },
  ],
};
