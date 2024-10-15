import "./globals.css";
import poppins from "../lib/fonts";
import Head from "next/head";

// Components
import CookieBanner from "@/components/CookieBanner";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export const metadata = {
  title: "O'CAOU, Un sac intelligent qui pense à tout.",
  description:
    "O'CAOU imagine un sac à dos qui se transforme en organiseur avec des poches étiquetées O'CAOU j'ai soif, O'CAOU j'ai faim, mon doudou O'CAOU, mes affaires O'CAOU, et juste O'CAOU...car on ne sait jamais! Un sac malin pour avoir tout sous la main.",
  image: "https://metatags.io/images/meta-tags.png",
  url: "https://www.ocaou.com",
  robots: "index, follow",
  twitterCard: "summary_large_image",
};

export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />

        {/* Twitter */}
        <meta property="twitter:card" content={metadata.twitterCard} />
        <meta property="twitter:url" content={metadata.url} />
        <meta property="twitter:title" content={metadata.title} />
        <meta property="twitter:description" content={metadata.description} />
        <meta property="twitter:image" content={metadata.image} />
      </Head>
      <body className={`${poppins.className} bg-white`}>
        <Menu />
        {children}
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}
