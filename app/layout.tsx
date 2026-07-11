import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ningning Zhang',
  description: 'Statistical forecasting, optimization, applied algorithms, and research.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
