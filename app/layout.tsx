import './globals.css';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata = {
  title: 'Praketrio',
  description: 'Platform pengiriman laut terpercaya untuk bisnis Indonesia dan global.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={robotoMono.variable}>
      <body>{children}</body>
    </html>
  );
}