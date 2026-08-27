import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";

export const metadata: Metadata = {
  title: "Company | WattsMIND Grid Agent",
  description:
    "WattsMIND Grid Agent company page for a power systems AI venture commercializing certifiable grid foundation models.",
};

const principles = [
  ["Physics first", "Models must respect the structure and constraints of power systems."],
  ["Operator trust", "Every recommendation needs a confidence boundary and escalation path."],
  ["Transfer economics", "One engine should serve many networks without repeating custom model work."],
];

export default function CompanyPage() {
  return (
    <main className="site-shell internal-shell">
      <SiteNav />
      <section className="internal-hero">
        <p className="eyebrow">Company</p>
        <h1>Commercializing certifiable grid foundation models.</h1>
        <p>
          WattsMIND Grid Agent brings together power-systems control, graph learning, and
          commercialization work aimed at turning university-grade inventions
          into deployable infrastructure software.
        </p>
      </section>
      <section className="internal-grid">
        {principles.map(([title, body]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="next-links">
        <a href="/platform">Platform</a>
        <a href="/validation">Validation</a>
        <a href="/contact">Contact</a>
      </section>
    </main>
  );
}
