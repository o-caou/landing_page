import "./globals.css";
import poppins from "../lib/fonts";

export const metadata = {
  title: "O'CAOU, Un sac intelligent qui pense à tout.",
  description:
    "O’CAOU imagine des accessoires ludiques, décoratifs et très fonctionnels qui facilitent le quotidien des parents et des enfants. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white`}>{children}</body>
    </html>
  );
}
