import type { Metadata } from "next";
import { TrainerView } from "./view";

const title = "The Trainer";
const description =
  "One trainer owns every session, program, and monthly briefing. Fourteen years in private practice — credentials, philosophy, and no handoffs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/trainer" },
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

export default function TrainerPage() {
  return <TrainerView />;
}
