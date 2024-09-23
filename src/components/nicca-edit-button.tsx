import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export const NiccaEditButton = () => {
  const handleEdit = () => {
    alert('編集Clicked!!');
  };

  return (
    <Button
      onClick={handleEdit}
      variant="outline"
      className="flex items-center justify-center bg-transparent text-primary"
    >
      <Edit className="size-6" />
    </Button>
  );
};
