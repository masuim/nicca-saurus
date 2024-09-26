'use client';

// TODO: サーバーコンポーネントとして保持し、クライアント側の機能（状態管理、イベントハンドリングなど）を含む新しいコンポーネント（例：UserNiccaListPageClient）を作成するように修正が必要。
// TODO: ログインしていない場合は、ログイン画面にリダイレクトするようにする。なってる？
// TODO: ログインしている場合は、ログインしているユーザーの日課一覧を取得する。
// TODO: 表示が遅いのは、サーバーの処理とクライアントの処理両方がここに書かれているから？

import { useEffect, useState } from 'react';
import { Nicca } from '@/schemas/nicca-schemas';
import { Header } from '@/components/layout/header';
import { SideMenu } from '@/components/side-menu/side-menu';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UserNiccaListPage() {
  const [userNiccas, setUserNiccas] = useState<Nicca[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserNiccas = async () => {
      if (session?.user?.id) {
        const response = await fetch('/api/nicca/user-niccas');
        const data = await response.json();
        if (data.success) {
          setUserNiccas(data.data);
        }
      }
    };

    fetchUserNiccas();
  }, [session]);

  //TODO: 仮の内容。mainContents作成後に修正必要になる予定。
  return (
    <div className="flex min-h-screen flex-col">
      <div className="lg:hidden">
        <Header openRegisterModal={() => {}} />
      </div>
      <div className="flex flex-1 flex-col lg:flex-row">
        <SideMenu openRegisterModal={() => {}} hasActiveNicca={false} />
        <main className="flex-1 p-4">
          <h1 className="mb-4 text-2xl font-bold">日課一覧</h1>
          <ul>
            {userNiccas.map((nicca, index) => (
              <li key={index} className="mb-2">
                <h2 className="text-lg font-semibold">{nicca.title}</h2>
                <p>
                  実施日：
                  {Object.entries(nicca.week)
                    .filter(([, value]) => value)
                    .map(([key]) => key)
                    .join(', ')}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link href="/">
              <Button variant="outline">ダッシュボードに戻る</Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
