import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { MobileCta } from "@/components/mobile-cta";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://limitless.fitness"),
  title: {
    default: "Limitless Fitness — Private Membership by Request",
    template: "%s · Limitless Fitness",
  },
  description:
    "A private fitness membership where your trainer owns the plan, the sessions, and the results. Request a private consultation.",
  openGraph: {
    title: "Limitless Fitness — Private Membership by Request",
    description:
      "You don't train. You arrive. One trainer owns your plan, sessions, and results.",
    type: "website",
    siteName: "Limitless Fitness",
  },
  twitter: {
    card: "summary",
    title: "Limitless Fitness",
    description:
      "Private membership. One trainer. Your health, handled.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable}`}
    >
      <body className="grain antialiased">
        <SmoothScroll />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthClub",
              name: "Limitless Fitness",
              url: "https://limitless.fitness",
              description:
                "A private fitness membership where your trainer owns the plan, the sessions, and the results.",
            }),
          }}
        />
        {children}
        <MobileCta />
      </body>
    </html>
  );
}
