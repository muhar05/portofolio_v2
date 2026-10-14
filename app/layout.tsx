import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import siteData from "@/content/site.json";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://muharferdiansyah.my.id";
const SITE_TITLE = "Muhar Ferdiansyah | Full Stack Engineer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Muhar Ferdiansyah",
  },
  description: siteData.statement,
  applicationName: "Muhar Ferdiansyah Portfolio",
  authors: [{ name: "Muhar Ferdiansyah" }],
  creator: "Muhar Ferdiansyah",
  keywords: [
    "Full Stack Engineer",
    "Software Engineer",
    "TypeScript",
    "Next.js",
    "React",
    "Laravel",
    "PHP",
    "Flutter",
    "PostgreSQL",
    "Prisma",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Muhar Ferdiansyah",
    title: SITE_TITLE,
    description: siteData.statement,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: siteData.statement,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
