import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Apollo 247 | Doctor Consultation & Online Medicines',
  description: 'Book appointments with top General Physicians and Internal Medicine specialists. Consult online or visit our clinic.',
  metadataBase: new URL('https://yourdomain.com'),
  keywords: 'doctor appointment, general physician, internal medicine, online consultation, apollo hospital',
  openGraph: {
    title: 'Apollo 247 | Book Doctor Appointments Online',
    description: 'Connect with the best general physicians and internal medicine specialists',
    url: 'https://yourdomain.com/specialties/general-physician-internal-medicine',
    siteName: 'Apollo 247',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head><link
  href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
  rel="stylesheet"
/></head>
      <body className={`${inter.className} min-h-screen bg-[#f6f7f9]`}>
        {children}
      </body>
    </html>
  );
}