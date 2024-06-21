import { useState, useEffect } from 'react';
import { fetcher, TRAVEL_URL } from '@/shared';

export function useProfile() {
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const fetchProfile = async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        console.error('JWT가 없습니다. 요청을 보내지 않습니다.');
        return; // JWT가 없으면 요청을 보내지 않음
      }
      const headers = {
        'Content-Type': 'application/json',
        Authorization: jwt,
      };
      const response = await fetcher(TRAVEL_URL, '/users', 'get', headers);

      if (response) {
        console.log('응답', response);
        setNickname(response.data.nickname);
        setEmail(response.data.email);
      } else {
        console.error('정보를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('에러', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    profileImage,
    handleProfileImageChange,
    nickname,
    setNickname,
    email,
    setEmail,
  };
}
