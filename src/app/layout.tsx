import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { siteUrl } from "@/config/site";
import { person, socials } from "@/content/site";
import { expertise } from "@/content/sections";
import { hero } from "@/content/hero";

// next/font downloads these at build time and serves them from our own origin.
const display = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
const sans = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const description =
  "Shubham Soni is a senior product design manager with 8+ years across fintech, edtech and commerce: Figma for the thinking, AI for the velocity.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${person.name} — ${person.jobTitle}`, template: `%s — ${person.name}` },
  description,
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: person.name,
    title: `${person.name} — ${person.jobTitle}`,
    description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: `${person.name} — ${person.jobTitle}`, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  url: siteUrl,
  image: `${siteUrl}${hero.portrait.src}`,
  jobTitle: person.jobTitle,
  email: `mailto:${person.email}`,
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Delhi" },
  ],
  knowsAbout: [...expertise.map((e) => e.title), "Figma", "User interface design", "Interaction design", "Prototyping", "Fintech"],
  sameAs: socials.map((s) => s.href),
};

export const viewport: Viewport = { themeColor: "#0A0A0B", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="grain min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-text px-4 py-2 text-sm text-bg focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <Nav />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
