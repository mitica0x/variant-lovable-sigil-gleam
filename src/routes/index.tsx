import { createFileRoute } from "@tanstack/react-router";
import { CoinSiglieriLanding } from "@/components/coinsiglieri/Landing";

export const Route = createFileRoute("/")({
  component: CoinSiglieriLanding,
  head: () => ({
    meta: [
      { title: "CoinSiglieri — Crypto intelligence, scored." },
      {
        name: "description",
        content:
          "All signal. 0 guess. Independent scoring of crypto exchanges, products and placements — built on public, auditable data.",
      },
      { property: "og:title", content: "CoinSiglieri — Crypto intelligence, scored." },
      {
        property: "og:description",
        content:
          "Independent scoring of crypto exchanges, products and placements. All signal. 0 guess.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});
