import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "MIND FM x (Grid Agent) | Certifiable AI for Power Grid Control";
const siteDescription =
  "MIND is a Manifold-Informed Neural Dual-encoder for zero-shot power system monitoring, control, and market intelligence.";

// Static export has no per-request headers, so the public origin is fixed here.
const siteUrl = "https://gridmind.ece.cornell.edu";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description:
      "Manifold-Informed Neural Dual-encoder for certifiable power grid monitoring and control.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "MIND FM x (Grid Agent) certifiable AI for power grid control",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: "Certifiable AI for power grid monitoring and control.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
