import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export const NiccaDeleteButton = ({ className }: { className?: string }) => {
  const handleDelete = () => {
    alert('削除Clicked!!');
  };

  return (
    <Button
      onClick={handleDelete}
      variant="outline"
      className={`flex items-center justify-center bg-transparent text-error ${className}`}
    >
      <Trash2 className="mr-2 size-6" />
    </Button>
  );
};
