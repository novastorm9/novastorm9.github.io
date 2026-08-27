import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";

export const metadata: Metadata = {
  title: "Technology | WattsMIND Grid Agent",
  description:
    "How WattsMIND Grid Agent uses universal graph learning, teacher-student geometry, and feasible control for electric power systems.",
};

const steps = [
  ["01", "Learn transferable grid geometry", "A universal graph model learns topology-independent parameters instead of memorizing one feeder."],
  ["02", "Deploy from sparse measurements", "A student encoder reaches the learned physics geometry from limited field telemetry."],
  ["03", "Issue a trust certificate", "Each inference carries an operational signal for when to trust, adapt, or escalate."],
  ["04", "Select feasible action", "The control engine moves on a constraint-satisfying action manifold in milliseconds."],
];

export default function TechnologyPage() {
  return (
    <main className="site-shell internal-shell">
      <SiteNav />
      <section className="internal-hero">
        <p className="eyebrow">Technology</p>
        <h1>Zero-shot transfer with an operator-facing trust layer.</h1>
        <p>
          The engine is built around the fact that grid states share structure
          through voltage geometry. That lets one model transfer across changing
          networks while still reporting when the transfer is valid.
        </p>
      </section>
      <section className="timeline-section">
        {steps.map(([number, title, body]) => (
          <article key={number}>
            <span>{number}</span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="next-links">
        <a href="/platform">Platform</a>
        <a href="/validation">Validation</a>
        <a href="/contact">Research partnership</a>
      </section>
    </main>
  );
}
