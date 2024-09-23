import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

export const NiccaDeleteButton = ({ className }: { className?: string }) => {
  const handleDelete = () => {
    alert('削除Clicked!!');
  };

  const isSmallScreen = useMediaQuery({ query: '(max-width: 425px)' });

  return (
    <Button
      onClick={handleDelete}
      variant="outline"
      className={`flex w-full items-center justify-center bg-transparent text-error ${className}`}
    >
      <Trash2 size={isSmallScreen ? 24 : 48} />
    </Button>
  );
};
