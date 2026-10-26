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
const SITE_TITLE =
  "Muhar Ferdiansyah | Full Stack Engineer (Next.js, Laravel, Flutter)";
const SITE_DESCRIPTION =
  "Full stack engineer available for remote and freelance work. I build and improve production systems with Next.js, Laravel, and Flutter.";

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhar Ferdiansyah",
  jobTitle: "Full Stack Engineer",
  url: SITE_URL,
  sameAs: [siteData.contact.github.href, siteData.contact.linkedin.href],
  knowsAbout: ["Next.js", "Laravel", "Flutter"],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Muhar Ferdiansyah",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Muhar Ferdiansyah Portfolio",
  authors: [{ name: "Muhar Ferdiansyah" }],
  creator: "Muhar Ferdiansyah",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Muhar Ferdiansyah",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
