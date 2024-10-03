'use client';

import Image from 'next/image';
import appLogo from '../../../public/images/app-name/app-name-2column.png';
import { MenuButton } from './side-menu/MenuButton';
import { useMenuItems } from '@/hooks/use-menu-items';

type Props = {
  openRegisterModal: () => void;
  hasActiveNicca: boolean;
};

export const SideMenu = ({ openRegisterModal }: Props) => {
  const menuItems = useMenuItems(openRegisterModal);

  return (
    <div className="hidden w-1/5 bg-primary p-4 text-white lg:block">
      <div className="flex flex-col items-center">
        <Image src={appLogo} alt="App Logo" className="mb-6 h-24 w-56" priority />
        <ul className="w-full list-none p-0">
          {menuItems.map((item, index) => (
            <MenuButton key={index} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
};
