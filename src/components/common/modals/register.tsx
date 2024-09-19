import { Button } from '@/components/ui/button';
import { Nicca, NiccaSchema } from '@/schemas/nicca-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  // setDashboardData: (data: DashboardData | null) => void;
};

const dayMap = ['月', '火', '水', '木', '金', '土', '日'];

const getDashboardData = async () => {
  const response = await fetch('/api/nicca');
  if (!response.ok) {
    throw new Error('ネットワークエラーが発生しました');
  }
  return response.json();
};

const registerNicca = async (nicca: Nicca) => {
  const response = await fetch('/api/nicca', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(nicca),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

export const RegisterNiccaModal = ({ isOpen, onClose }: Props) => {
  const form = useForm<z.infer<typeof NiccaSchema>>({
    resolver: zodResolver(NiccaSchema),
    defaultValues: {
      title: '',
      week: {
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      },
    },
  });

  const [week, setWeek] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });

  const handleDayClick = (day: keyof typeof week) => {
    setWeek((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const onSubmit = async (values: z.infer<typeof NiccaSchema>) => {
    try {
      const nicca = {
        title: values.title,
        week: values.week,
      };
      await registerNicca(nicca);
      onClose();
      const data = await getDashboardData();
      // setDashboardData(data);
      // TODO: ダッシュボードに反映
      console.log('data', data);
    } catch (error) {
      console.error('Error registering nicca:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-primary">
      <div className="w-96 rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">日課登録</h2>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <input
            placeholder="日課を入力して下さい。"
            {...form.register('title')}
            className="w-full border p-2"
          />
          <div className="mt-4 flex space-x-2">
            {dayMap.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayClick(day as keyof typeof week)}
                className={`flex size-10 items-center justify-center rounded-full ${
                  week[day as keyof typeof week] ? 'bg-primary text-white' : 'bg-white text-primary'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              戻る
            </Button>
            <Button type="submit" className="text-white">
              登録
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
