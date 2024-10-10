import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { SideMenu } from '@/components/layout/SideMenu';

interface LayoutProps {
  children: ReactNode;
  hasActiveNicca: boolean;
  openRegisterDialog: () => void;
}

export const Layout = ({ children, hasActiveNicca, openRegisterDialog }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="lg:hidden">
        <Header openRegisterDialog={openRegisterDialog} />
      </div>
      <div className="flex flex-1 flex-col lg:flex-row">
        <main className="flex-1 p-4">{children}</main>
        <SideMenu openRegisterDialog={openRegisterDialog} hasActiveNicca={hasActiveNicca} />
      </div>
    </div>
  );
};
