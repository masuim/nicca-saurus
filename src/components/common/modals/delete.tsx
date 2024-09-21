import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { ApiResult } from '@/types/api-types';
import { useState, useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (niccaId: string) => Promise<void>;
};

// ダミーデータ
const dummyNicca = {
  id: '1',
  title: '毎日ジョギング',
  status: 'active',
  completedSets: 2,
};

const deleteNicca = async (niccaId: string): Promise<ApiResult<{ id: string }>> => {
  const response = await fetch(`/api/nicca/${niccaId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data: ApiResult<{ id: string }> = await response.json();

  if (!data.success) {
    throw new Error(data.error);
  }

  return data;
};

export const NiccaDeleteModal = ({ isOpen, onClose, onDelete }: Props) => {
  const [selectedNicca, setSelectedNicca] = useState<string>('');
  const [niccas, setNiccas] = useState<{ id: string; title: string }[]>([]);

  const fetchNiccas = async () => {
    const response = await fetch('/api/nicca');
    const data: ApiResult<{ id: string; title: string }[]> = await response.json();
    if (data.success) {
      setNiccas(data.data);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNiccas();
    }
  }, [isOpen]);

  const handleDelete = async () => {
    if (selectedNicca) {
      try {
        await deleteNicca(selectedNicca);
        onDelete(selectedNicca);
        onClose();
      } catch (error) {
        console.error('Error deleting nicca:', error);
      }
    }
  };

  if (!isOpen) return null;

  const selectedNiccaTitle = niccas.find((nicca) => nicca.id === selectedNicca)?.title;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="日課削除">
      <select
        value={selectedNicca}
        onChange={(e) => setSelectedNicca(e.target.value)}
        className="mb-4 w-full rounded-md border-2 border-primary/60 p-2 focus:outline-none focus:ring-2"
      >
        <option value="">削除する日課を選択してください</option>
        {niccas.map((nicca) => (
          <option key={nicca.id} value={nicca.id}>
            {nicca.title}
          </option>
        ))}
      </select>
      {selectedNiccaTitle && (
        <p className="mb-4 text-center">「{selectedNiccaTitle}」を削除しますか？</p>
      )}
      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose} className="border-2 border-primary/60">
          いいえ
        </Button>
        <Button onClick={handleDelete} className="bg-error text-white" disabled={!selectedNicca}>
          はい
        </Button>
      </div>
    </Modal>
  );
};
