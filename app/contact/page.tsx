import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";

export const metadata: Metadata = {
  title: "Contact | WattsMIND Grid Agent",
  description:
    "Contact WattsMIND Grid Agent for customer discovery, pilot discussions, and research partnerships.",
};

export default function ContactPage() {
  return (
    <main className="site-shell internal-shell">
      <SiteNav />
      <section className="contact-layout">
        <div className="internal-hero contact-copy">
          <p className="eyebrow">Contact</p>
          <h1>Bring a real grid workflow to the conversation.</h1>
          <p>
            We are prioritizing conversations with utilities, cooperatives,
            software vendors, operators, market teams, and large flexible-load
            operators.
          </p>
          <a className="primary-action" href="mailto:hello@grid-agent.ai">
            hello@grid-agent.ai
          </a>
        </div>
        <div className="contact-panel">
          <span>Discovery brief</span>
          <h3>Helpful context</h3>
          <p>Customer segment</p>
          <p>Target workflow</p>
          <p>Available network or benchmark data</p>
          <p>Deployment constraints</p>
        </div>
      </section>
    </main>
  );
}
