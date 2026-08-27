import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";

export const metadata: Metadata = {
  title: "Validation | WattsMIND Grid Agent",
  description:
    "Technical validation for WattsMIND Grid Agent across state estimation, AC optimal power flow, and false-data localization.",
};

const results = [
  ["100 unseen topologies", "Zero-shot state estimation across distribution test systems."],
  ["12 ms decisions", "Real-time AC OPF decisions with feasibility preserved."],
  ["97x faster", "Reported speedup versus a model-predictive-control baseline."],
  ["93-97%", "Zero-shot false-data localization range in demonstrated systems."],
];

export default function ValidationPage() {
  return (
    <main className="site-shell internal-shell">
      <SiteNav />
      <section className="internal-hero">
        <p className="eyebrow">Validation</p>
        <h1>Benchmarks focused on transfer, feasibility, and speed.</h1>
        <p>
          The validation program is organized around the operational questions
          buyers ask first: does it transfer, is it fast enough, and can the
          system tell me when to trust it?
        </p>
      </section>
      <section className="result-grid">
        {results.map(([value, label]) => (
          <article key={value}>
            <strong>{value}</strong>
            <p>{label}</p>
          </article>
        ))}
      </section>
      <section className="next-links">
        <a href="/technology">How it works</a>
        <a href="/customers">Customer segments</a>
        <a href="/contact">Request benchmark discussion</a>
      </section>
    </main>
  );
}
