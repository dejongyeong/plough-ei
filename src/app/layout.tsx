import './globals.css';

export const metadata = {
  title: 'Ploughing EI',
  description: 'Ploughing EI MCQ Application',
  authors: [
    {
      name: 'De Jong Yeong',
      url: 'https://www.linkedin.com/in/de-jong-yeong/',
    },
  ],
  creator: 'De Jong Yeong',
  icons: { icon: '/favicon.ico' },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ploughing EI',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
