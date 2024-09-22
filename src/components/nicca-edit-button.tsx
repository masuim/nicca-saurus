import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export const NiccaEditButton = () => {
  const handleEdit = () => {
    alert('編集Clicked!!');
  };

  return (
    <Button onClick={handleEdit} variant="outline" className="border-primary text-primary">
      <Edit className="mr-2 size-4" />
    </Button>
  );
};
