import { FlashMessageProvider } from '@/contexts/flash-message-context';
import { Metadata } from 'next';
import { NiccaProvider } from '@/contexts/niicca-context';
import './globals.css';
import { FlashMessage } from '@/components/common/flash-message';
import { Providers } from '@/contexts/providers';

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
