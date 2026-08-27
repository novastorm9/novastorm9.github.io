import type { Product } from "./product-data";
import { SiteNav } from "../components/SiteNav";
import { products } from "./product-data";

type ProductPageProps = {
  product: Product;
};

type ProductEvidence = {
  eyebrow: string;
  title: string;
  body: string;
  condition: string;
  figures: {
    src: string;
    alt: string;
    caption: string;
  }[];
  metrics: {
    value: string;
    label: string;
  }[];
  notes: string[];
};

type SetupFacts = {
  title: string;
  tiles: { value: string; label: string }[];
  noteTitle: string;
  noteBody: string;
};

type SetupFigure = {
  src: string;
  alt: string;
  caption: string;
  facts?: SetupFacts;
};

const productSetupFigures: Partial<Record<Product["slug"], SetupFigure[]>> = {
  "utilities-coops": [
    {
      src: "/feeder-radial.svg",
      alt: "Radial distribution feeder topology: 500 buses branching from a single substation",
      caption:
        "A SmartDSS/OpenDSS distribution system drawn from its exported graph. Rings are distance from the substation and line weight follows downstream load, so the feeder backbone reads as the backbone.",
      facts: {
        title: "Held-out system facts",
        tiles: [
          { value: "271", label: "buses" },
          { value: "270", label: "radial line segments" },
          { value: "19384.2", label: "kW total load" },
          { value: "11", label: "maximum tree depth" },
          { value: "12.47 kV", label: "line-to-line base" },
          { value: "3-phase", label: "imbalanced feeder model" },
        ],
        noteTitle: "What the model receives",
        noteBody:
          "Raw DSS circuit files plus operating snapshots: topology, line parameters, phase loads, and device states. The learned solver must produce voltage phasors without retraining on this topology.",
      },
    },
    {
      src: "/product01-transfer-distribution-rich.png",
      alt: "Zero-shot transfer illustration from SmartDSS training distribution to held-out testing distribution",
      caption:
        "Transfer setup: learn from a training distribution of SmartDSS-randomized systems, then evaluate solver and control behavior on a disjoint held-out testing distribution with 0 system-specific fine-tuning.",
    },
  ],
};

const productWorkflow: Partial<
  Record<Product["slug"], { step: string; title: string; body: string }[]>
> = {
  "utilities-coops": [
    {
      step: "01",
      title: "Read the DSS circuit",
      body: "Start from a SmartDSS-generated OpenDSS system description: topology, phases, lines, loads, devices, and operating snapshots.",
    },
    {
      step: "02",
      title: "Solve the grid state",
      body: "Predict the three-phase power-flow voltage solution on a different random system with 0 system-specific fine-tuning.",
    },
    {
      step: "03",
      title: "Observe attack impact",
      body: "Track how device-level cyber attacks drive phase imbalance away from the nominal operating trajectory.",
    },
    {
      step: "04",
      title: "Apply agent mitigation",
      body: "Select corrective controls that push the imbalance trajectory back toward the optimal controller reference.",
    },
  ],
};

const productEvidence: Partial<Record<Product["slug"], ProductEvidence>> = {
  "utilities-coops": {
    eyebrow: "Application 01",
    title: "A surrogate power-flow solve on a distribution system held out from training.",
    body: "The model is not memorizing one circuit template. It is trained across SmartDSS-randomized distribution systems, then given a new DSS system description and asked to predict the three-phase voltage phasor solution produced by the power-flow solver.",
    condition:
      "Experiment: SmartDSS randomly generates distribution systems; training and testing systems are disjoint. The test result is zero-shot power-flow solving on a completely unseen DSS topology with 0 system-specific fine-tuning.",
    figures: [
      {
        src: "/product01-phasor-trace.png",
        alt: "Three-phase voltage magnitude prediction versus ground truth on a held-out DSS feeder",
        caption:
          "Three-phase voltage magnitude from the learned solver versus numerical power-flow ground truth on a held-out SmartDSS-generated distribution system.",
      },
      {
        src: "/product01-results-summary.png",
        alt: "Product 01 experimental result summary with training curve, model comparison, inference benchmark, and prediction trace",
        caption:
          "Validation-selected training curve, held-out SmartDSS random-system power-flow evaluation, cached inference benchmark, and prediction trace from the SING result set.",
      },
    ],
    metrics: [
      {
        value: "0.000851",
        label: "power-flow voltage magnitude MAE, p.u.",
      },
      {
        value: "0.000944",
        label: "power-flow phasor RMSE",
      },
      {
        value: "2.6%",
        label: "student loss relative to zero baseline",
      },
      {
        value: "0.716 ms",
        label: "cached end-to-end inference per sample",
      },
    ],
    notes: [
      "0 system-specific fine-tuning",
      "SmartDSS-randomized distribution systems",
      "Disjoint training and held-out testing distributions",
    ],
  },
};

const productControlEvidence: Partial<Record<Product["slug"], ProductEvidence>> = {
  "utilities-coops": {
    eyebrow: "Application 02",
    title: "Agent control for cyber-attack mitigation.",
    body: "A cyber attack can push controllable devices in directions that amplify phase imbalance. The grid agent observes the attacked operating trajectory and learns corrective control that suppresses imbalance close to the optimal controller.",
    condition:
      "Experiment: device-level 30% attack scenarios perturb phase behavior across SmartDSS random systems. The learned controller is compared against zero mitigation and an optimal control reference over the same attack rollout.",
    figures: [
      {
        src: "/imbalance_curves.png",
        alt: "Cyber attack mitigation curves comparing zero mitigation, learned control, and optimal control across phase imbalance scenarios",
        caption:
          "Phase-imbalance eta under device-level cyber attacks. Grey shows zero mitigation, blue shows learned agent control, and green shows the optimal controller.",
      },
    ],
    metrics: [
      {
        value: "30%",
        label: "device-level attack scenario",
      },
      {
        value: "6",
        label: "phase raise/depress attack cases shown",
      },
      {
        value: "50 min",
        label: "mitigation rollout horizon",
      },
      {
        value: "near-optimal",
        label: "learned control trajectory",
      },
    ],
    notes: [
      "Cyber attack mitigation via agent control",
      "Zero mitigation vs learned control vs optimal reference",
      "Objective: suppress phase-imbalance eta during attack windows",
    ],
  },
};

export function ProductPage({ product }: ProductPageProps) {
  const setupFigures = productSetupFigures[product.slug];
  const evidence = productEvidence[product.slug];
  const controlEvidence = productControlEvidence[product.slug];
  const evidenceSections = [evidence, controlEvidence].filter(
    (item): item is ProductEvidence => Boolean(item),
  );
  const workflow = productWorkflow[product.slug];
  const workflowItems =
    workflow ??
    product.applications.slice(0, 4).map((application, index) => ({
      step: String(index + 1).padStart(2, "0"),
      title: application,
      body: product.value[index] ?? product.lead,
    }));

  return (
    <main className="site-shell product-detail-shell">
      <div className="detail-topbar">
        <SiteNav />
      </div>

      <section className="detail-hero">
        <div className="detail-copy">
          <p className="eyebrow">{product.eyebrow}</p>
          <h1>{product.headline}</h1>
          <p>{product.lead}</p>
        </div>
        <div className="detail-metric" aria-label={`${product.metric} ${product.metricLabel}`}>
          <strong>{product.metric}</strong>
          <span>{product.metricLabel}</span>
        </div>
      </section>

      {setupFigures ? (
        <section className="setup-section" aria-label="Distribution systems and transfer setup">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">System and transfer setup</p>
              <h2>Random systems first. Held-out topology with 0 fine-tuning second.</h2>
            </div>
            <p>
              The experiments are built around SmartDSS-randomized distribution
              systems, not a single hand-tuned feeder. The held-out case is a
              disjoint OpenDSS topology used to test zero-shot solver and
              control behavior with 0 system-specific fine-tuning.
            </p>
          </div>
          <div className="setup-figures">
            {setupFigures.map((figure) => (
              <figure
                className={figure.facts ? "split" : undefined}
                key={figure.src}
              >
                <div className="setup-figure-body">
                  <img src={figure.src} alt={figure.alt} />
                  {figure.facts ? (
                    <div className="setup-facts">
                      <h3>{figure.facts.title}</h3>
                      <div className="setup-facts-grid">
                        {figure.facts.tiles.map((tile) => (
                          <div key={tile.label}>
                            <strong>{tile.value}</strong>
                            <span>{tile.label}</span>
                          </div>
                        ))}
                      </div>
                      <h4>{figure.facts.noteTitle}</h4>
                      <p>{figure.facts.noteBody}</p>
                    </div>
                  ) : null}
                </div>
                <figcaption>{figure.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {evidenceSections.map((item) => (
        <section
          className="evidence-section"
          aria-label={`${product.shortName} ${item.eyebrow}`}
          key={item.eyebrow}
        >
          <div className="evidence-copy">
            <p className="eyebrow">{item.eyebrow}</p>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            <p className="evidence-condition">{item.condition}</p>
            <div className="evidence-notes" aria-label="Experiment scope">
              {item.notes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          </div>

          <div className="evidence-board">
            <div className="evidence-metrics">
              {item.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
            <div className="evidence-figures">
              {item.figures.map((figure) => (
                <figure className="evidence-figure" key={figure.src}>
                  <img src={figure.src} alt={figure.alt} />
                  <figcaption>{figure.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="detail-system" aria-label={`${product.shortName} system view`}>
        <div className="workflow-panel" aria-label="Product workflow">
          <p className="eyebrow">Workflow</p>
          <h2>
            {workflow
              ? "From DSS model to solver and control."
              : "A product workflow built around the grid engine."}
          </h2>
          <div className="workflow-steps">
            {workflowItems.map((item) => (
              <article key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="detail-lists">
          <div>
            <p className="eyebrow">Applications</p>
            <ul>
              {product.applications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Why it matters</p>
            <ul>
              {product.value.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="detail-cta">
        <p className="eyebrow">Next step</p>
        <h2>Evaluate this product line against a real grid workflow.</h2>
        <a className="primary-action" href="/contact">
          Discuss fit
        </a>
      </section>

      <section className="product-nav-section">
        <p className="eyebrow">All products</p>
        <div className="product-nav-grid">
          {products.map((item) => (
            <a
              className={item.slug === product.slug ? "active" : undefined}
              href={`/products/${item.slug}`}
              key={item.slug}
            >
              <span>{item.eyebrow}</span>
              <strong>{item.shortName}</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
