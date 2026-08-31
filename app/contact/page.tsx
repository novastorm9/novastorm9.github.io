import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";

export const metadata: Metadata = {
  title: "Contact | MIND FM x (Grid Agent)",
  description:
    "Contact the MIND FM x (Grid Agent) research team for research collaborations, benchmark discussions, and project questions.",
};

export default function ContactPage() {
  return (
    <main className="site-shell internal-shell">
      <SiteNav />
      <section className="contact-layout">
        <div className="internal-hero contact-copy">
          <p className="eyebrow">Contact</p>
          <h1>Contact the MIND FM x (Grid Agent) research team.</h1>
          <p>
            For research collaborations, benchmark discussions, and project
            questions, please contact the team members below.
          </p>
          <a
            className="primary-action"
            href="mailto:as337@cornell.edu,tong.wu@ucf.edu,ac2458@cornell.edu,arnold37@llnl.gov"
          >
            Email the research team
          </a>
        </div>
        <div className="contact-panel">
          <span>Research team</span>
          <h3>Contacts</h3>
          <p>
            <strong>Anna Scaglione</strong>
            <br />
            <a href="mailto:as337@cornell.edu">as337@cornell.edu</a>
          </p>
          <p>
            <strong>Tong Wu</strong>
            <br />
            <a href="mailto:tong.wu@ucf.edu">tong.wu@ucf.edu</a>
          </p>
          <p>
            <strong>Andrew Campbell</strong>
            <br />
            <a href="mailto:ac2458@cornell.edu">ac2458@cornell.edu</a>
          </p>
          <p>
            <strong>Daniel Brian Arnold</strong>
            <br />
            <a href="mailto:arnold37@llnl.gov">arnold37@llnl.gov</a>
          </p>
        </div>
      </section>
    </main>
  );
}
