import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const NiccaEditButton = ({ className }: { className?: string }) => {
  const handleEdit = () => {
    alert('編集Clicked!!');
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
      onClick={handleEdit}
      variant="outline"
      className={`xs:min-w-[48px] flex w-full items-center justify-center bg-transparent text-primary ${className}`}
    >
      <Edit size={size} />
    </Button>
  );
};
