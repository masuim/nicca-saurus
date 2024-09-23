import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

export const NiccaEditButton = ({ className }: { className?: string }) => {
  const handleEdit = () => {
    alert('編集Clicked!!');
  };

  const isSmallScreen = useMediaQuery({ query: '(max-width: 425px)' });

  return (
    <Button
      onClick={handleEdit}
      variant="outline"
      className={`flex w-full items-center justify-center bg-transparent text-primary ${className}`}
    >
      <Edit size={isSmallScreen ? 24 : 48} />
    </Button>
  );
};
