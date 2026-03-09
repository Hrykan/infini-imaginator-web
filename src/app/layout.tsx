import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://imaginator.in"),
  title: "Infini Imaginator Tech | AI Automation & Business Intelligence Consulting",
  description:
    "9+ years of enterprise consulting — $500K in actionable insights, 500+ reports delivered. Transform your business with AI automation, business intelligence, and data analytics that drive concrete, measurable outcomes.",
  keywords: [
    "AI automation",
    "business intelligence",
    "data analytics",
    "n8n workflows",
    "AI agents",
    "Qlik",
    "Tableau",
    "consulting",
  ],
  authors: [{ name: "Mukul Kulkarni" }],
  openGraph: {
    title: "Infini Imaginator Tech | AI Automation & Business Intelligence Consulting",
    description:
      "9+ years of enterprise consulting — $500K in actionable insights, 500+ reports delivered. AI automation and business intelligence that drives concrete outcomes.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Infini Imaginator Tech — AI Automation & Business Intelligence Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infini Imaginator Tech | AI Automation & Business Intelligence Consulting",
    description:
      "9+ years of enterprise consulting — $500K in actionable insights, 500+ reports delivered. AI automation and BI consulting that drives real outcomes.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
