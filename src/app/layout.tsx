import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Garden Live | CAK3D',
  description: 'A living animated top-down 3D dashboard for CAK3D Garden agents and devices.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
