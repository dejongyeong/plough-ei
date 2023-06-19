import './globals.css';

export const metadata = {
  title: 'Enterprise Ireland Ploughing Championships',
  description: 'Enterprise Ireland Ploughing Championships MCQ Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
