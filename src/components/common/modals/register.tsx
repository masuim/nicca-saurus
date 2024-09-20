import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Nicca, NiccaSchema } from '@/schemas/nicca-schemas';
import { ApiResult } from '@/types/api-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  // setDashboardData: (data: DashboardData | null) => void;
};

const dayMap = ['月', '火', '水', '木', '金', '土', '日'];

const registerNicca = async (nicca: Nicca): Promise<ApiResult<Nicca>> => {
  const response = await fetch('/api/nicca', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(nicca),
  });

  const data: ApiResult<Nicca> = await response.json();

  if (!data.success) {
    throw new Error(data.error);
  }

  return data;
};

export const NiccaRegisterModal = ({ isOpen, onClose }: Props) => {
  const form = useForm<z.infer<typeof NiccaSchema>>({
    resolver: zodResolver(NiccaSchema),
    defaultValues: {
      title: '',
      week: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
    },
    mode: 'onChange',
  });

  const toggleDay = (day: keyof z.infer<typeof NiccaSchema>['week']) => {
    form.setValue(`week.${day}`, !form.getValues(`week.${day}`), { shouldValidate: true });
    form.trigger('week');
  };

  const onSubmit = async (values: z.infer<typeof NiccaSchema>) => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

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
          placeholder="日課を入力してください"
          {...form.register('title')}
          className="mb-4 w-full rounded-md border-2 border-primary/60 p-2 focus:outline-none focus:ring-2"
        />
        {form.formState.errors.title && (
          <p className="mb-2 text-sm text-error">{form.formState.errors.title.message}</p>
        )}
        <div className="mt-4 flex justify-between">
          {dayMap.map((day, index) => {
            const dayKey = [
              'monday',
              'tuesday',
              'wednesday',
              'thursday',
              'friday',
              'saturday',
              'sunday',
            ][index] as keyof z.infer<typeof NiccaSchema>['week'];
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
                  onChange={() => toggleDay(dayKey)}
                  className="hidden"
                />
                <span>{day}</span>
              </label>
            );
          })}
        </div>
        {form.formState.errors.week && (
          <p className="mt-2 text-sm text-error">{form.formState.errors.week.message}</p>
        )}
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
