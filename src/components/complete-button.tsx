import { Button } from '@/components/ui/button';

export const CompleteButton = () => {
  const handleComplete = () => {
    alert('完了Clicked!!');
  };

  return (
    <Button onClick={handleComplete} className="bg-success text-white">
      完了
    </Button>
  );
};
