import { Button } from '@/components/elements/Button';
import { Trash2 } from 'lucide-react';

export const NiccaDeleteButton = ({ className }: { className?: string }) => {
  const handleDelete = () => {
    alert('削除Clicked!!');
  };

  return (
    <Button
      onClick={handleDelete}
      variant="outline"
      className={`flex flex-1 items-center justify-center bg-transparent text-error xs:min-w-[48px] ${className}`}
    >
      <Trash2 size={16} />
    </Button>
  );
};
