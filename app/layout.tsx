import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ningningzhang',
  description: 'Personal website — research, projects, blog, and life.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
