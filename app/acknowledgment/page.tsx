import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";

export const metadata: Metadata = {
  title: "Acknowledgment | MIND FM x (Grid Agent)",
  description:
    "Acknowledgment of sponsors and institutional collaborators for the MIND FM x (Grid Agent) research project.",
};

export default function AcknowledgmentPage() {
  return (
    <main className="site-shell internal-shell">
      <SiteNav />
      <section className="internal-hero">
        <p className="eyebrow">Acknowledgment</p>
        <h1>Research support and institutional collaboration.</h1>
        <p>
          The MIND FM x (Grid Agent) research effort acknowledges support and
          collaboration from federal sponsors and institutional partners
          advancing resilient, intelligent power-grid systems.
        </p>
      </section>
      <section className="internal-grid">
        <article>
          <h3>DOE CESER</h3>
          <p>
            U.S. Department of Energy, Office of Cybersecurity, Energy Security,
            and Emergency Response.
          </p>
        </article>
        <article>
          <h3>NSF</h3>
          <p>
            National Science Foundation support for foundational research in
            power systems, learning, and control.
          </p>
        </article>
        <article>
          <h3>Cornell</h3>
          <p>
            Cornell University research environment and collaboration across
            electrical and computer engineering.
          </p>
        </article>
        <article>
          <h3>LLNL</h3>
          <p>
            Lawrence Livermore National Laboratory collaboration on resilient
            grid modeling and validation.
          </p>
        </article>
        <article>
          <h3>UCF</h3>
          <p>
            University of Central Florida collaboration on MIND FM x (Grid Agent)
            research development and evaluation.
          </p>
        </article>
      </section>
      <section className="next-links">
        <a href="/#themes">Research Themes</a>
        <a href="/contact">Contact</a>
      </section>
    </main>
  );
}
