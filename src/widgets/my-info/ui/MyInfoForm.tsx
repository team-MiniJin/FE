'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetcher, TRAVEL_URL } from '@/shared';
import Link from 'next/link';
import { z } from 'zod';

// 유효성 검사 스키마 정의
const nicknameSchema = z.string().regex(/^[가-힣a-zA-Z]{2,50}$/, {
  message: '2~50자의 한글, 영문만 가능합니다.',
});

const emailSchema = z
  .string()
  .email({ message: '올바른 이메일 형식이 아닙니다.' });

type UserInfo = {
  nickname: string;
  email: string;
};

export default function MyInfoForm() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [editMode, setEditMode] = useState({
    nickname: false,
    email: false,
  });
  const [formData, setFormData] = useState<UserInfo>({
    nickname: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<UserInfo>>({
    nickname: '',
    email: '',
  });

  // 사용자 정보 불러오기
  useEffect(() => {
    async function loadUserInfo() {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        console.error('JWT가 없습니다. 요청을 보내지 않습니다.');
        return; // JWT가 없으면 요청을 보내지 않음
      }
      const headers = {
        'Content-Type': 'application/json',
        Authorization: jwt,
      };
      try {
        const response = await fetcher(TRAVEL_URL, '/users', 'get', headers);
        if (response) {
          console.log('응답', response);
          setUserInfo(response.data);
          setFormData({
            nickname: response.data.nickname,
            email: response.data.email,
          });
        }
      } catch (error: any) {
        console.log('에러', error);
        alert('사용자 정보를 불러오는 데 실패했습니다.');
      }
    }
    loadUserInfo();
  }, []);

  const handleEdit = (field: 'nickname' | 'email') => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    // 수정 모드 진입 시 현재 유효성 검사 상태 초기화
    if (field === 'nickname') setErrors((prev) => ({ ...prev, nickname: '' }));
    if (field === 'email') setErrors((prev) => ({ ...prev, email: '' }));
  };

  const handleChange = (field: 'nickname' | 'email', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // 유효성 검사
    const schema = field === 'nickname' ? nicknameSchema : emailSchema;
    const validation = schema.safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [field]: validation.success ? '' : validation.error.errors[0].message,
    }));
  };

  const handleSave = async (field: 'nickname' | 'email') => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      console.error('JWT가 없습니다. 요청을 보내지 않습니다.');
      return; // JWT가 없으면 요청을 보내지 않음
    }
    const value = formData[field];
    const schema = field === 'nickname' ? nicknameSchema : emailSchema;
    const validation = schema.safeParse(value);
    if (validation.success) {
      try {
        const response = await fetcher(
          TRAVEL_URL,
          `/users/${field}`,
          'patch',
          {
            'Content-Type': 'application/json',
            Authorization: jwt,
          },
          undefined,
          { [field]: value }
        );
        if (response.data.success) {
          setUserInfo((prev) => ({
            ...prev!,
            [field]: value,
          }));
          setEditMode((prev) => ({
            ...prev,
            [field]: false,
          }));
          alert(
            `${field === 'nickname' ? '닉네임' : '이메일'}이 성공적으로 업데이트되었습니다.`
          );
        } else {
          alert('업데이트에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error: any) {
        console.log(error);
        alert(error.message);
      }
    } else {
      // 유효성 검사 실패 시 에러 메시지 설정
      setErrors((prev) => ({
        ...prev,
        [field]: validation.error.errors[0].message,
      }));
    }
  };

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="w-full max-w-lg space-y-8 rounded-lg bg-white p-8 shadow-xl">
      <div className="font-bold">내 정보</div>
      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="font-semibold">닉네임</div>
          {editMode.nickname ? (
            <div className="flex flex-col">
              <Input
                value={formData.nickname}
                onChange={(e) => handleChange('nickname', e.target.value)}
                className="flex-1"
              />
              {errors.nickname && (
                <div className="text-sm text-red-500">{errors.nickname}</div>
              )}
            </div>
          ) : (
            <div className="flex-1">{userInfo.nickname}</div>
          )}
          <Button
            type="button"
            onClick={() => handleEdit('nickname')}
            className="ml-4 bg-[--brand-main-color] hover:bg-[--brand-main-color] hover:opacity-50"
          >
            {editMode.nickname ? '취소' : '수정'}
          </Button>
          {editMode.nickname && (
            <Button
              type="button"
              onClick={() => handleSave('nickname')}
              className="ml-4 bg-[--brand-main-color] hover:bg-[--brand-main-color] hover:opacity-50"
              disabled={!!errors.nickname}
            >
              저장
            </Button>
          )}
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="font-semibold">이메일</div>
          {editMode.email ? (
            <div className="flex flex-col">
              <Input
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="flex-1"
              />
              {errors.email && (
                <div className="text-sm text-red-500">{errors.email}</div>
              )}
            </div>
          ) : (
            <div className="flex-1">{userInfo.email}</div>
          )}
          <Button
            type="button"
            onClick={() => handleEdit('email')}
            className="ml-4 bg-[--brand-main-color] hover:bg-[--brand-main-color] hover:opacity-50"
          >
            {editMode.email ? '취소' : '수정'}
          </Button>
          {editMode.email && (
            <Button
              type="button"
              onClick={() => handleSave('email')}
              className="ml-4 bg-[--brand-main-color] hover:bg-[--brand-main-color] hover:opacity-50"
              disabled={!!errors.email}
            >
              저장
            </Button>
          )}
        </div>
        <div className="flex h-10 items-center hover:bg-gray-100 hover:text-[--brand-color]">
          <Link href="/my-scrap" className="w-full">
            내가 스크랩한 일정
          </Link>
        </div>
        <div className="flex h-10 items-center hover:bg-gray-100 hover:text-[--brand-color]">
          <Link href="/change-password" className="w-full">
            비밀번호 변경하기
          </Link>
        </div>
        <div className="flex h-10 items-center hover:bg-gray-100 hover:text-[--brand-color]">
          <Link href="/delete-account" className="w-full">
            회원탈퇴하기
          </Link>
        </div>
      </div>
    </div>
  );
}
