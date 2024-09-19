import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

const getDashboardData = () => {
  return fetch('/api/nicca').then((response) => {
    if (!response.ok) {
      throw new Error('ネットワークエラーが発生しました');
    }
    return response.json();
  });
};

export const registerNicca = async (nicca: Nicca) => {
  try {
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

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('日課登録中に予期しないエラーが発生しました。');
  }
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
        week: {
          mon: values.week.mon,
          tue: values.week.tue,
          wed: values.week.wed,
          thu: values.week.thu,
          fri: values.week.fri,
          sat: values.week.sat,
          sun: values.week.sun,
        },
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-labelledby="dialog-title">
        <DialogHeader>
          <DialogTitle id="dialog-title">日課登録</DialogTitle>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <input
              placeholder="日課を入力して下さい。"
              {...form.register('title')}
              className="border p-2"
            />
            <div className="mt-4 flex space-x-2">
              {dayMap.map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDayClick(day as keyof typeof week)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleDayClick(day as keyof typeof week);
                  }}
                  className={`flex size-10 items-center justify-center rounded-full ${
                    week[day as keyof typeof week]
                      ? 'bg-primary text-white'
                      : 'bg-white text-primary'
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
              <Button type="submit">登録</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
