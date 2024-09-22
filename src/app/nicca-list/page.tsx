'use client';

import { useEffect, useState } from 'react';
import { Nicca } from '@/schemas/nicca-schemas';
import { Header } from '@/components/layout/header';
import { SideMenu } from '@/components/side-menu/side-menu';
import { useSession } from 'next-auth/react';

export default function NiccaListPage() {
  const [niccas, setNiccas] = useState<Nicca[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchNiccas = async () => {
      console.log('session', session?.user?.id);
      if (session?.user?.id) {
        const response = await fetch('/api/nicca/user-niccas');
        const data = await response.json();
        if (data.success) {
          setNiccas(data.data);
        }
      }
    };

    fetchNiccas();
  }, [session]);

  //TODO: 仮の内容。mainContents作成後に修正必要になる予定。
  return (
    <div className="flex min-h-screen flex-col">
      <div className="lg:hidden">
        <Header />
      </div>
      <div className="flex flex-1 flex-col lg:flex-row">
        <SideMenu openRegisterModal={() => {}} hasActiveNicca={false} />
        <main className="flex-1 p-4">
          <h1 className="mb-4 text-2xl font-bold">日課一覧</h1>
          <ul>
            {niccas.map((nicca, index) => (
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
        </main>
      </div>
    </div>
  );
}
