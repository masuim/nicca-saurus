import { SaurusType } from '@/schemas/nicca/nicca-schemas';

type Props = {
  saurusType: SaurusType;
  className?: string;
};

export const SaurusImage = ({ saurusType, className }: Props) => {
  const imagePath = `/images/saurus/${saurusType}/${saurusType}1.png`;
  return (
    <div className={`mb-4 ${className}`}>
      <img
        src={imagePath}
        alt={saurusType}
        width={200}
        height={200}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};
