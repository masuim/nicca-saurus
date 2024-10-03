import { Button } from '@/components/elements/Button';

export const NiccaCompleteButton = ({ className }: { className?: string }) => {
  const handleComplete = () => {
    alert('完了Clicked!!');
  };

  return (
    <Button onClick={handleComplete} className={`bg-success text-white ${className}`}>
      完了
    </Button>
  );
};
