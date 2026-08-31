import type { Metadata } from "next";
import { SiteNav } from "./components/SiteNav";
import { products } from "./products/product-data";

const signals = [
  "Topology-invariant",
  "Zero-shot transfer",
  "Per-instance certification",
  "Millisecond control",
];

const bottlenecks = [
  ["Reconfiguration", "Models break when feeders change."],
  ["Sparse telemetry", "Distribution data is incomplete by default."],
  ["Operational trust", "AI must know when not to act."],
];

const stack = [
  ["Manifold-informed transfer", "Maps grid structure and observations into a shared operating geometry."],
  ["Neural dual-encoder", "Keeps a deployable pathway aligned with the physics pathway used in training."],
  ["Feasible control manifold", "Selects constraint-satisfying actions in real time."],
];

const proof = [
  ["100", "unseen distribution topologies"],
  ["12 ms", "AC OPF decision time"],
  ["97x", "faster than MPC baseline"],
  ["93-97%", "zero-shot false-data localization"],
];

const DualEncoderIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="4.6" cy="5.4" r="1.6" />
    <circle cx="4.6" cy="18.6" r="1.6" />
    <path d="M6.4 5.9c5.4 0.9 4.2 5.7 9.2 6.1" />
    <path d="M6.4 18.1c5.4-0.9 4.2-5.7 9.2-6.1" />
    <circle cx="18.2" cy="12" r="2.4" />
  </svg>
);

const NetworkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="5" cy="6.6" r="1.9" />
    <circle cx="19" cy="6.6" r="1.9" />
    <circle cx="12" cy="12" r="1.9" />
    <circle cx="7.5" cy="19" r="1.9" />
    <circle cx="16.5" cy="19" r="1.9" />
    <path d="M6.6 7.9 10.5 11" />
    <path d="M17.4 7.9 13.5 11" />
    <path d="M11.1 13.7 8.4 17.2" />
    <path d="M12.9 13.7 15.6 17.2" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7.5 16.5 16.5 7.5" />
    <path d="M9.4 7.5h7.1v7.1" />
  </svg>
);

const mindLetters = [
  ["M", "Manifold"],
  ["I", "Informed"],
  ["N", "Neural"],
  ["D", "Dual-encoder"],
];

const papers = [
  {
    id: "2606.00716",
    href: "https://arxiv.org/abs/2606.00716",
    title:
      "Graph Transfer Learning via Shared Latent Geometry: Theory and Applications",
    authors: "Tong Wu, Andrew Campbell, Anna Scaglione",
    note: "The dual-encoder result: a teacher trained on simulator physics, a student deployed on sparse field measurements, with transfer bounded by Wasserstein proximity.",
    icon: <DualEncoderIcon />,
  },
  {
    id: "2509.08672",
    href: "https://arxiv.org/abs/2509.08672",
    title:
      "Universal Graph Learning for Power System Reconfigurations: Transfer Across Topology Variations",
    authors: "Tong Wu, Anna Scaglione, Sandy Miguel, Daniel Arnold",
    note: "The topology-invariant backbone: one trained model transfers to unseen reconfigurations without retraining on the new grid.",
    icon: <NetworkIcon />,
  },
];

export const metadata: Metadata = {
  title: "WattsMIND Grid Agent | Certifiable AI for Power Grid Control",
  description:
    "WattsMIND Grid Agent is a Manifold-Informed Neural Dual-encoder for certifiable power system monitoring, control, and market intelligence.",
};

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero-section" id="top" aria-labelledby="hero-title">
        <SiteNav context="home" />

        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Grid foundation model</p>
            <h1 id="hero-title">
              Certifiable AI for grid decisions that have to hold up in the
              field.
            </h1>
            <p className="hero-text">
              A zero-shot monitoring and control engine that transfers across
              changing power networks, reasons from sparse measurements, and
              reports when an operator can trust the result.
            </p>
          </div>

          <figure className="hero-visual">
            <img
              src="/grid-foundation-model.png"
              alt="Grid foundation model connecting multiple electric network topologies"
            />
          </figure>
        </div>

        <div className="signal-strip" aria-label="Platform signals">
          {signals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
      </section>

      <section className="mind-section" id="research">
        <div
          className="mind-expansion"
          aria-label="MIND stands for Manifold-Informed Neural Dual-encoder"
        >
          {mindLetters.map(([letter, word]) => (
            <div className="mind-letter" key={letter}>
              <span aria-hidden="true">{letter}</span>
              <strong>{word}</strong>
            </div>
          ))}
        </div>

        <div className="section-heading">
          <p className="eyebrow">Research</p>
          <h2>The technology behind WattsMIND Grid Agent</h2>
        </div>

        <div className="paper-grid">
          {papers.map((paper) => (
            <a
              className="paper-card"
              href={paper.href}
              target="_blank"
              rel="noreferrer"
              key={paper.id}
            >
              <span className="paper-icon" aria-hidden="true">
                {paper.icon}
              </span>
              <div className="paper-copy">
                <span className="paper-id">arXiv:{paper.id}</span>
                <h3>{paper.title}</h3>
                <p className="paper-authors">{paper.authors}</p>
                <p className="paper-note">{paper.note}</p>
              </div>
              <span className="paper-arrow" aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="product-section" id="product">
        <div className="product-copy">
          <p className="eyebrow">Operator cockpit</p>
          <h2>Less dashboard. More verified action.</h2>
          <div className="bottleneck-grid">
            {bottlenecks.map(([title, body]) => (
              <article className="compact-point" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
        <figure className="cockpit-visual">
          <img
            src="/grid-agent-cockpit.png"
            alt="WattsMIND Grid Agent operator cockpit showing topology, certification, and control recommendation panels"
          />
        </figure>
      </section>

      <section className="platform-section" id="platform">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Architecture</p>
            <h2>Transfer, certify, control.</h2>
          </div>
          <p>
            The platform is a research demonstration engine for studying how
            transfer, certification, and feasible control can support grid
            operations, planning studies, software prototypes, and market-aware
            grid analytics.
          </p>
        </div>

        <div className="architecture-layout">
          <div className="architecture-visual" aria-label="WattsMIND Grid Agent model stack">
            <div className="architecture-column input-column">
              <span>Grid inputs</span>
              <div>DSS / topology</div>
              <div>Telemetry</div>
              <div>Loads & devices</div>
            </div>
            <div className="architecture-core">
              <span>WattsMIND Grid Agent engine</span>
              <strong>Manifold-Informed Neural Dual-encoder</strong>
              <p>Transferable grid representation with per-instance feasibility checks.</p>
            </div>
            <div className="architecture-column output-column">
              <span>Research outputs</span>
              <div>Power-flow solve</div>
              <div>Certificate</div>
              <div>Control action</div>
              <div>Embedded API</div>
            </div>
            <span className="architecture-flow flow-a" />
            <span className="architecture-flow flow-b" />
            <span className="architecture-flow flow-c" />
          </div>

          <div className="stack-list">
            {stack.map(([title, body], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="journey-section">
        <div className="section-heading">
          <p className="eyebrow">Explore</p>
          <h2>Move through the site by question, not by scroll length.</h2>
        </div>
        <div className="journey-grid">
          <a href="/platform">
            <span>Platform</span>
            <strong>What is the platform?</strong>
          </a>
          <a href="/technology">
            <span>Technology</span>
            <strong>How does the engine work?</strong>
          </a>
          <a href="/validation">
            <span>Validation</span>
            <strong>What has been demonstrated?</strong>
          </a>
          <a href="#themes">
            <span>Research Themes</span>
            <strong>Where can the platform apply?</strong>
          </a>
        </div>
      </section>

      <section className="products-section" id="themes">
        <div className="section-heading">
          <p className="eyebrow">Research themes</p>
          <h2>Five application themes, one underlying grid engine.</h2>
        </div>
        <div className="product-mosaic">
          {products.map((product) => (
            <a
              className="product-card"
              href={`/products/${product.slug}`}
              key={product.slug}
            >
              <span>{product.eyebrow}</span>
              <h3>{product.shortName}</h3>
              <p>{product.summary}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="validation-section" id="validation">
        <div className="section-heading">
          <p className="eyebrow">Validation</p>
          <h2>Evidence that reads like infrastructure, not demo ware.</h2>
        </div>
        <div className="proof-grid">
          {proof.map(([value, label]) => (
            <div className="proof-tile" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <p className="eyebrow">Research collaboration</p>
        <h2>Connecting demonstrations with real grid workflows and datasets.</h2>
        <a className="primary-action" href="/contact">
          Discuss a demonstration
        </a>
      </section>
    </main>
  );
}
