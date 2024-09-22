import { FlashMessage } from '@/components/flash-message';
import { Providers } from '@/components/providers';
import { FlashMessageProvider } from '@/contexts/flash-message-context';
import { Metadata } from 'next';
import './globals.css';
import { NiccaProvider } from '@/contexts/niicca-context';

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
            <NiccaProvider>
              <FlashMessage />
              {children}
            </NiccaProvider>
          </FlashMessageProvider>
        </Providers>
      </body>
    </html>
  );
}
