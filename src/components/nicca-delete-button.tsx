import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const NiccaDeleteButton = ({ className }: { className?: string }) => {
  const handleDelete = () => {
    alert('削除Clicked!!');
  };

  const [size, setSize] = useState(48);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 424px)' });

  useEffect(() => {
    if (isSmallScreen) {
      setSize(24);
    } else {
      setSize(48);
    }
  }, [isSmallScreen]);

  return (
    <Button
      onClick={handleDelete}
      variant="outline"
      className={`xs:min-w-[48px] flex w-full items-center justify-center bg-transparent text-error ${className}`}
    >
      <Trash2 size={size} />
    </Button>
  );
};
