
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import imagesData from "@/app/lib/placeholder-images.json"

const faviconUrl = imagesData.placeholderImages.find(img => img.id === "site-favicon")?.imageUrl || "/favicon.ico";

export const viewport: Viewport = {
  themeColor: '#2B59FF',
}

export const metadata: Metadata = {
  title: 'OmniStock SaaS | Controle de Inventário Multiunidade',
  description: 'Gestão de estoque inteligente com reconciliação por IA e segurança via PIN.',
  icons: {
    icon: [
      { url: faviconUrl, sizes: 'any' },
    ],
    shortcut: faviconUrl,
    apple: faviconUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
