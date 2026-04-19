import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { ClientSideProviders } from "@/components/providers/ClientSideProviders";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// src/app/layout.tsx

export const metadata: Metadata = {
  metadataBase: new URL('https://walterianieri.com'), // Sostituisci con il tuo dominio reale
  title: {
    default: "Walter Ianieri — Engineering Provocation. Architecting Profits.",
    template: "%s | Walter Ianieri"
  },
  description: "Industrial designer and innovator specializing in cyber-industrial product design, patented systems, and high-tech solutions.",
  keywords: ["industrial design", "innovation", "product design", "MENTIME", "cocktail station", "Walter Ianieri"],
  authors: [{ name: "Walter Ianieri" }],
  creator: "Walter Ianieri",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://walterianieri.com",
    siteName: "Walter Ianieri Portfolio",
    title: "Walter Ianieri — Engineering Provocation",
    description: "Design industriale, sistemi brevettati e soluzioni high-tech per settori Ho.Re.Ca e nautica di lusso.",
    images: [
      {
        url: "/assets/about/walter-front.png", // Assicurati che questo percorso sia corretto
        width: 1200,
        height: 630,
        alt: "Walter Ianieri - Industrial Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Walter Ianieri — Industrial Designer",
    description: "Engineering Provocation. Architecting Profits.",
    images: ["/assets/about/portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export const viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased selection:bg-accent/30 selection:text-foreground`}
    >
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="noise">
        <ClientSideProviders>
          {children}
        </ClientSideProviders>
      </body>
    </html>
  );
}
