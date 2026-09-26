import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Self-hosted via npm — no network fetch needed.
const geistSans = GeistSans;
const geistMono = GeistMono;

// Heavy contemporary grotesk — display typeface.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ATEN STUDIO KE — Creative Technology · Film · Photography · Software",
  description:
    "ATEN STUDIO KE is a Kisumu-born creative technology studio. We create things — film, media, photography, software and digital skills. Technology meets creative practice.",
  keywords: [
    "ATEN Studio",
    "ATEN Studio KE",
    "creative technology Kisumu",
    "film production Kenya",
    "photography studio",
    "software development",
    "digital skills training",
    "media production",
  ],
  authors: [{ name: "ATEN Studio KE" }],
  openGraph: {
    title: "ATEN STUDIO KE — We Create Things",
    description:
      "Creative technology, film, media, photography, software and digital skills. Technology meets creative practice.",
    siteName: "ATEN Studio KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATEN STUDIO KE — We Create Things",
    description:
      "Creative technology, film, media, photography, software and digital skills.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${bricolage.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
