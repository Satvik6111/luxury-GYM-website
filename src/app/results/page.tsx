import type { Metadata } from "next";
import { ResultsView } from "./view";

const title = "Results";
const description =
  "Anonymized, measured member outcomes — baseline, six-week reassessment, and a monthly briefing. The system behind the numbers, without theatrics.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/results" },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Limitless Fitness",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function ResultsPage() {
  return <ResultsView />;
}
