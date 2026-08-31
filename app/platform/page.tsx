import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";

export const metadata: Metadata = {
  title: "Platform | MIND FM x (Grid Agent)",
  description:
    "MIND is a Manifold-Informed Neural Dual-encoder that connects sparse measurements, transfer learning, certification, and feasible control for power-system operations.",
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
          MIND is the Manifold-Informed Neural Dual-encoder behind the
          platform: a deployable layer for topology transfer, operator trust,
          and feasible control inside utility workflows, research software
          prototypes, planning studies, and flexible-load operations.
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
        <a href="/#themes">Research Themes</a>
        <a href="/contact">Discuss a demonstration</a>
      </section>
    </main>
  );
}
