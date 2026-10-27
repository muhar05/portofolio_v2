import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://muharferdiansyah.my.id";
const SITE_TITLE =
  "Muhar Ferdiansyah | Full Stack Developer (Next.js, Laravel, Flutter)";
const SITE_DESCRIPTION =
  "Full stack developer available for remote and freelance work. I build and improve production systems with Next.js, Laravel, and Flutter.";
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhar Ferdiansyah",
  jobTitle: "Full Stack Developer",
  url: "https://muharferdiansyah.my.id",
  sameAs: [
    "https://github.com/muhar05",
    "https://www.linkedin.com/in/muhar-ferdiansyah-b44161291/",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Laravel",
    "PHP",
    "Flutter",
    "PostgreSQL",
  ],
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
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#edf0ea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
