'use client';

import { useEffect, useState } from 'react';
import { Nicca } from '@/schemas/nicca/nicca-schemas';
import { Button } from '@/components/elements/Button';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';

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
    <Layout hasActiveNicca={false} openRegisterDialog={() => {}}>
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
    </Layout>
  );
};
