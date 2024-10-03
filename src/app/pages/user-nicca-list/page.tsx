import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { UserNiccaListClient } from '@/components/pages/UserNiccaListClient';

export default async function UserNiccaListPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth');
  }

  return <UserNiccaListClient />;
}
