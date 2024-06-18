/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import { GiHamburgerMenu } from 'react-icons/gi';
import { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useAuth } from '@/shared';
import GNB from './GNB';
import JoinLink from './JoinLink';
import LoginLink from './LoginLink';
import LogoutButton from './LogoutButton';
import MyPageLink from './MyPageLink';

export default function Header() {
  const navDivRef = useRef<HTMLDivElement>(null);
  const openNav = () => {
    navDivRef.current?.classList.remove('-right-full');
    navDivRef.current?.classList.add('right-0');
  };
  const closeNav = () => {
    navDivRef.current?.classList.remove('right-0');
    navDivRef.current?.classList.add('-right-full');
  };
  const { jwt } = useAuth();

  return (
    <header className=" flex items-center justify-between py-6 ">
      <div className="flex items-center  space-x-8">
        <h1 className="text-2xl font-bold">Travel</h1>
        <div
          className="absolute	 -right-full top-0 z-50 h-full w-full bg-white transition-all md:static md:block"
          ref={navDivRef}
        >
          <button
            type="button"
            className="absolute right-5 top-5 md:hidden"
            onClick={closeNav}
          >
            <IoMdClose className="text-2xl" />
          </button>
          <GNB closeNav={closeNav} />
        </div>
      </div>
      <div className="absolute right-[74px] text-sm md:static">
        {jwt ? (
          <div className="space-x-4">
            <MyPageLink />
            <LogoutButton />
          </div>
        ) : (
          <div className="space-x-4">
            <LoginLink />
            <JoinLink />
          </div>
        )}
      </div>
      <button
        className="absolute right-[36px] top-[31px]  md:hidden"
        type="button"
        onClick={openNav}
      >
        <GiHamburgerMenu className="text-xl" />
      </button>
    </header>
  );
}
