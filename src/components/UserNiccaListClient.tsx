'use client';

import { useEffect, useState } from 'react';
import { Nicca } from '@/schemas/nicca-schemas';
import { Header } from '@/components/layout/Header';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { SideMenu } from '@/components/side-menu/SideMenu';

export const UserNiccaListClient = () => {
  const [userNiccas, setUserNiccas] = useState<Nicca[]>([]);

  useEffect(() => {
    const fetchUserNiccas = async () => {
      const response = await fetch('/api/nicca/user-niccas');
      const data = await response.json();
      if (data.success) {
        setUserNiccas(data.data);
      }
    };

    fetchUserNiccas();
  }, []);

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
};
