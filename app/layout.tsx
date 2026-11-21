import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { JsonLd } from "@/components/shared";
import { getPages } from "@/lib/content";
import { CONTACT_EMAIL, FOUNDER, LINKEDIN_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// One typeface everywhere: Inter (headings, body and labels).
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME}: content engine for B2B travel & hotel tech`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: FOUNDER.name, url: FOUNDER.linkedin }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: SITE_NAME, url: SITE_URL, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
};

const orgLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      description: SITE_DESCRIPTION,
      founder: { "@type": "Person", name: FOUNDER.name, sameAs: [LINKEDIN_URL] },
      sameAs: [LINKEDIN_URL],
      knowsAbout: ["B2B content strategy", "Positioning", "Thought leadership", "AI content operations", "Hotel technology", "Travel technology"],
    },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: SITE_NAME, url: SITE_URL, publisher: { "@id": `${SITE_URL}/#org` } },
  ],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pages = (await getPages()).filter((p) => p.showInMenu);
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header pages={pages} />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={orgLd} />
        <Script src="/site.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
