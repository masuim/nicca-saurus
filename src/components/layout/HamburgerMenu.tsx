import { MenuItem } from '@/hooks/use-menu-items';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
};

export const HamburgerMenu = ({ isOpen, onClose, menuItems }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-64 bg-white p-4 shadow-lg"
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-primary">
              ×
            </button>
            <nav className="mt-8">
              <ul className="space-y-4">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.href ? (
                      <Link href={item.href} className="text-primary hover:underline">
                        {item.label}
                      </Link>
                    ) : (
                      <button onClick={item.onClick} className="text-primary hover:underline">
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
