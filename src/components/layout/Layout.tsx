import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { SideMenu } from '@/components/layout/SideMenu';

interface LayoutProps {
  children: ReactNode;
  hasActiveNicca: boolean;
  openRegisterModal: () => void;
}

export const Layout = ({ children, hasActiveNicca, openRegisterModal }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="lg:hidden">
        <Header openRegisterModal={openRegisterModal} />
      </div>
      <div className="flex flex-1 flex-col lg:flex-row">
        <main className="flex-1 p-4">{children}</main>
        <SideMenu openRegisterModal={openRegisterModal} hasActiveNicca={hasActiveNicca} />
      </div>
    </div>
  );
};
