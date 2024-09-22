'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import logo from '@/app/images/logos/bg-removed-logo.png';
import { HamburgerMenu } from '@/components/layout/hamburger-menu';
import { useMenuItems } from '@/hooks/use-menu-items';

export const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = useMenuItems(() => {});

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="flex h-16 items-center justify-between bg-primary px-4 lg:hidden">
      <Link href="/">
        <Image
          src={logo}
          alt="App Logo"
          width={64}
          height={64}
          className="mt-1 h-full w-auto object-contain"
          priority
        />
      </Link>
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
