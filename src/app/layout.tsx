import { FlashMessage } from '@/components/flash-message';
import { Providers } from '@/components/providers';
import { FlashMessageProvider } from '@/contexts/flash-message-context';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nicca Saurus',
  description: 'Your daily nicca tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="font-dotgothic">
        <Providers>
          <FlashMessageProvider>
            <FlashMessage />
            {children}
          </FlashMessageProvider>
        </Providers>
      </body>
    </html>
  );
}
