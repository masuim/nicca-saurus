'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

import logo from '../../../public/images/logos/bg-removed-logo.png';

import { useMenuItems } from '@/hooks/use-menu-items';
import { HamburgerMenu } from '@/components/layout/HamburgerMenu';

type Props = {
  openRegisterDialog: () => void;
};

export const Header = ({ openRegisterDialog }: Props) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = useMenuItems(() => {
    setIsOpen(false);
    openRegisterDialog();
  });

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="flex h-16 items-center justify-between bg-primary px-4 lg:hidden">
      <Image
        src={logo}
        alt="App Logo"
        width={64}
        height={64}
        className="mt-1 h-full w-auto object-contain"
        priority
      />
      {session && (
        <>
          <button onClick={toggleMenu} className="text-white">
            ☰
          </button>
          <HamburgerMenu isOpen={isOpen} onClose={closeMenu} menuItems={menuItems} />
        </>
      )}
    </header>
  );
};
