import Link from 'next/link';

type Props = {
  label: string;
  onClick?: () => void;
  href?: string;
};

export const MenuButton = ({ label, onClick, href }: Props) => {
  const buttonContent = (
    <button
      className="bg-secondary hover:bg-secondary-dark w-full rounded px-4 py-2 text-left text-white"
      onClick={onClick}
    >
      {label}
    </button>
  );

  return (
    <li className="mb-2">{href ? <Link href={href}>{buttonContent}</Link> : buttonContent}</li>
  );
};
