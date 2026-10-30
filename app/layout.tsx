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
  "Full Stack Developer for Operations Systems | Muhar Ferdiansyah";
const SITE_DESCRIPTION =
  "I build web and mobile systems for operations-heavy teams with Next.js, Laravel, and Flutter. Currently in administration, open to remote roles and freelance projects.";
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhar Ferdiansyah",
  jobTitle: "Full Stack Developer",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  email: "mailto:ferdiansyahmuh5@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Skip to content
        </a>
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
