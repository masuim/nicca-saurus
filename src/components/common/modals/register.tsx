import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Nicca, NiccaSchema } from '@/schemas/nicca-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  // setDashboardData: (data: DashboardData | null) => void;
};

const dayMap = ['月', '火', '水', '木', '金', '土', '日'];

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

  const handleDayChange = (day: keyof z.infer<typeof NiccaSchema>['week']) => {
    const currentValue = form.getValues(`week.${day}`);
    form.setValue(`week.${day}`, !currentValue);
  };

  const onSubmit = async (values: z.infer<typeof NiccaSchema>) => {
    try {
      const nicca = {
        title: values.title,
        week: values.week,
      };
      await registerNicca(nicca);
      onClose();
      form.reset();
    } catch (error) {
      console.error('Error registering nicca:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="日課登録">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input
          placeholder="日課を入力して下さい"
          {...form.register('title')}
          className="mb-4 w-full rounded-md border-2 border-primary/60 p-2 focus:outline-none focus:ring-2"
        />
        <div className="mt-4 flex justify-between">
          {dayMap.map((day, index) => {
            const dayKey = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'][
              index
            ] as keyof z.infer<typeof NiccaSchema>['week'];
            return (
              <label
                key={index}
                className={`flex items-center justify-center rounded-full ${
                  form.watch(`week.${dayKey}`)
                    ? 'bg-primary text-white'
                    : 'border-2 border-primary/60 bg-white text-primary'
                } mx-1 size-8 text-xs`}
              >
                <input
                  type="checkbox"
                  {...form.register(`week.${dayKey}`)}
                  onChange={() => handleDayChange(dayKey)}
                  className="hidden"
                />
                <span>{day}</span>
              </label>
            );
          })}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} className="border-2 border-primary/60">
            戻る
          </Button>
          <Button type="submit" className="text-white">
            登録
          </Button>
        </div>
      </form>
    </Modal>
  );
};
