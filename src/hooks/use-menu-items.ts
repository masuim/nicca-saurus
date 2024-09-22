import { useSignOut } from '@/services/auth-service';

export type MenuItem = {
  label: string;
  onClick?: () => void;
  href?: string;
};

export const useMenuItems = (openRegisterModal: () => void) => {
  const signOutUser = useSignOut();

  const menuItems: MenuItem[] = [
    { label: '日課登録', onClick: openRegisterModal },
    { label: '日課一覧', href: '/user-nicca-list' },
    { label: 'ユーザー設定', onClick: () => alert('ユーザー設定クリック！') },
    { label: 'サインアウト', onClick: signOutUser },
  ];

  return menuItems;
};
