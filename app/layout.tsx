import type { Metadata } from 'next';
import '@/app/css/globals.css';

export const metadata: Metadata = {
  title: 'Media Collector',
  description: 'Collect and manage media from URLs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col">{children}</body>
    </html>
  );
}
