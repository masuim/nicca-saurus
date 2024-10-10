import { Metadata } from 'next';
import { NiccaProvider } from '@/providers/NiccaProvider';
import './globals.css';

import { Providers } from '@/providers/Providers';
import { FlashMessageProvider } from '@/providers/FlashMessageProvider';
import { FlashMessage } from '@/components/modules/FlashMessage';

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
