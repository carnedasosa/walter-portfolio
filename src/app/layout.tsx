import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Walter Ianieri — Engineering Provocation. Architecting Profits.",
  description: "Industrial designer and innovator specializing in cyber-industrial product design, patented systems, and high-tech solutions for Ho.Re.Ca, luxury nautical, and industrial sectors.",
  keywords: ["industrial design", "innovation", "product design", "MENTIME", "cocktail station", "luxury design", "Walter Ianieri"],
};

export const viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
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
      <body className="noise">
        {children}
      </body>
    </html>
  );
}
