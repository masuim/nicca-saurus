import { SaurusType } from '@/schemas/nicca-schemas';

type Props = {
  saurusType: SaurusType;
};

export const SaurusImage = ({ saurusType }: Props) => {
  const imagePath = `/images/saurus/${saurusType}/${saurusType}1.png`;
  return (
    <div className="mb-4">
      <img src={imagePath} alt={saurusType} width={200} height={200} />
    </div>
  );
};
