import { Button } from '@/components/ui/Button';

export const CompleteButton = ({ className }: { className?: string }) => {
  const handleComplete = () => {
    alert('完了Clicked!!');
  };

  return (
    <Button onClick={handleComplete} className={`bg-success text-white ${className}`}>
      完了
    </Button>
  );
};
