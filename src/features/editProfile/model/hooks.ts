import { useState } from 'react';

export function useProfile() {
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('닉네임');
  const [name, setName] = useState('홍길동');
  const [email, setEmail] = useState('abc@gmail.com');
  const [contact, setContact] = useState('010-0000-0000');

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
    name,
    setName,
    email,
    setEmail,
    contact,
    setContact,
  };
}
