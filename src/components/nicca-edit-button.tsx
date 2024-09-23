import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export const NiccaEditButton = ({ className }: { className?: string }) => {
  const handleEdit = () => {
    alert('編集Clicked!!');
  };

  return (
    <Button
      onClick={handleEdit}
      variant="outline"
      className={`xs:min-w-[48px] flex flex-1 items-center justify-center bg-transparent text-primary ${className}`}
    >
      <Edit size={16} />
    </Button>
  );
};
