import { Providers } from '@/components/providers';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nicca Saurus',
  description: 'Your daily nicca tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-dotgothic">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
