import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";

export const metadata: Metadata = {
  title: "Platform | WattsMIND Grid Agent",
  description:
    "The WattsMIND Grid Agent platform connects sparse measurements, transfer learning, certification, and feasible control for power-system operations.",
};

const modules = [
  ["Monitoring", "Estimate operating state from sparse, noisy field measurements."],
  ["Certification", "Expose confidence and trust boundaries before a recommendation is used."],
  ["Control", "Generate feasible actions under grid constraints in real time."],
  ["Integration", "Deploy through API, embedded engine, or on-prem architecture."],
];

export default function PlatformPage() {
  return (
    <main className="site-shell internal-shell">
      <SiteNav />
      <section className="internal-hero">
        <p className="eyebrow">Platform</p>
        <h1>A grid AI engine designed for operations, not demos.</h1>
        <p>
          WattsMIND Grid Agent packages topology transfer, operator trust, and feasible
          control into a platform layer that can sit inside utility workflows,
          vendor software, market analytics, and flexible-load operations.
        </p>
      </section>
      <section className="internal-grid">
        {modules.map(([title, body]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="next-links">
        <a href="/technology">Technology</a>
        <a href="/#products">Products</a>
        <a href="/contact">Discuss a pilot</a>
      </section>
    </main>
  );
}
