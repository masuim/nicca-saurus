import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export const NiccaDeleteButton = () => {
  const handleDelete = () => {
    alert('削除Clicked!!');
  };

  return (
    <Button onClick={handleDelete} variant="outline" className="border-error text-error">
      <Trash2 className="mr-2 size-4" />
    </Button>
  );
};
