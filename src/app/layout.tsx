import './globals.css';

export const metadata = {
  title: 'Engineers Ireland Ploughing Championships',
  description: 'Engineers Ireland Ploughing Championships MCQ Application',
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
