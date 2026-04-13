import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SkipLink } from "@/components/chrome/SkipLink";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { ConsentBanner } from "@/components/compliance/ConsentBanner";
import { AnalyticsProvider } from "@/components/compliance/AnalyticsProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Encompass Parking — Controllership for Parking Revenue",
  description:
    "Encompass is the controllership layer for parking assets. We sit above any operator and any technology stack — reconciling revenue, governing exceptions, and continuously improving NOI across every site in the portfolio.",
  metadataBase: new URL("https://encompassparking.com"),
  openGraph: {
    title: "Encompass Parking — Controllership for Parking Revenue",
    description:
      "Encompass is the controllership layer for parking assets. Proof, closure, and continuous improvement, delivered per site-month.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    type: "website",
    siteName: "Encompass Parking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Encompass Parking — Controllership for Parking Revenue",
    description:
      "Encompass is the controllership layer for parking assets. Proof, closure, and continuous improvement, delivered per site-month.",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary font-sans">
        <SkipLink />
        <Nav />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <ConsentBanner />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
