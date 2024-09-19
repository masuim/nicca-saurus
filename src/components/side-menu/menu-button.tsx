type Props = {
  label: string;
  onClick?: () => void;
};

export function MenuButton({ label, onClick }: Props) {
  return (
    <li className="mb-2">
      <button
        className="bg-secondary hover:bg-secondary-dark w-full rounded px-4 py-2 text-left text-white"
        onClick={onClick}
      >
        {label}
      </button>
    </li>
  );
}
