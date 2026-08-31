import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const output = path.join(root, "public", "product03-framework.png");
const width = 1900;
const height = 1080;

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

function text({ x, y, lines, size = 28, weight = 500, fill = "#0b1f33", anchor = "start", lh = 1.28 }) {
  const rows = Array.isArray(lines) ? lines : [lines];
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Inter, Helvetica Neue, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">
    ${rows
      .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : size * lh}">${esc(line)}</tspan>`)
      .join("")}
  </text>`;
}

function roundedRect({ x, y, w, h, r = 18, fill = "#ffffff", stroke = "#d7ded8", sw = 2, opacity = 1 }) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}"/>`;
}

function pill({ x, y, w, h, label, fill = "#eef7f0", stroke = "#c9ddcf", color = "#245d47" }) {
  return `${roundedRect({ x, y, w, h, r: h / 2, fill, stroke, sw: 1.6 })}
  ${text({ x: x + w / 2, y: y + h / 2 + 8, lines: label, size: 23, weight: 650, fill: color, anchor: "middle" })}`;
}

function card({
  x,
  y,
  w,
  h,
  title,
  body,
  accent = "#2c8b66",
  titleSize = 28,
  bodySize = 21,
  titleY = 56,
  bodyY = 98,
}) {
  return `<g>
    ${roundedRect({ x, y, w, h, r: 16, fill: "#ffffff", stroke: "#d8e0db", sw: 2 })}
    <rect x="${x}" y="${y}" width="${w}" height="7" rx="3.5" fill="${accent}"/>
    ${text({ x: x + 28, y: y + titleY, lines: title, size: titleSize, weight: 700, fill: "#102032", lh: 1.12 })}
    ${text({ x: x + 28, y: y + bodyY, lines: body, size: bodySize, weight: 500, fill: "#607080", lh: 1.28 })}
  </g>`;
}

function miniGrid({ x, y, w, h }) {
  const nodeSpec = [
    [0.12, 0.44, "#2c8b66"],
    [0.34, 0.25, "#0e1c2b"],
    [0.58, 0.48, "#0e1c2b"],
    [0.88, 0.3, "#c58b27"],
    [0.38, 0.78, "#0e1c2b"],
    [0.76, 0.82, "#0e1c2b"],
  ];
  const nodes = nodeSpec.map(([px, py, fill]) => [x + px * w, y + py * h, fill]);
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 4],
    [4, 5],
    [2, 5],
  ];
  return `<g>
    ${roundedRect({ x, y, w, h, r: 18, fill: "#f3f7f7", stroke: "#cbd9dd", sw: 2 })}
    ${edges
      .map(([a, b]) => {
        const [x1, y1] = nodes[a];
        const [x2, y2] = nodes[b];
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#93a4b4" stroke-width="6" stroke-linecap="round"/>`;
      })
      .join("")}
    ${nodes
      .map(
        ([cx, cy, fill], index) =>
          `<circle cx="${cx}" cy="${cy}" r="${index === 0 ? 24 : 16}" fill="${fill}" stroke="#ffffff" stroke-width="6"/>`,
      )
      .join("")}
    ${text({ x: x + 36, y: y + 50, lines: "case", size: 18, weight: 700, fill: "#2c8b66" })}
  </g>`;
}

function arrow({ x1, y1, x2, y2, color = "#2d71b8" }) {
  const id = `arrow-${x1}-${y1}-${x2}-${y2}`.replaceAll(".", "-");
  return `<defs>
    <marker id="${id}" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
      <path d="M 0 0 L 12 6 L 0 12 z" fill="${color}"/>
    </marker>
  </defs>
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="7" stroke-linecap="round" marker-end="url(#${id})"/>`;
}

const leftCards = [
  ["Grid model", ["buses, branches,", "limits, topology"], "#2c8b66"],
  ["Operating state", ["injections, load,", "telemetry snapshot"], "#2d71b8"],
  ["Grid changes", ["outages, switching,", "model uncertainty"], "#c58b27"],
  ["Objectives & limits", ["cost, ramping,", "thermal, voltage"], "#64748b"],
];

const decisionCards = [
  [["Voltage", "prediction"], ["magnitude and angle", "at monitored buses"], "#2d71b8"],
  [["Contingency", "screening"], ["base case through", "changing outages"], "#2c8b66"],
  [["Constraint", "risk"], ["rank stressed buses", "and active limits"], "#c58b27"],
  [["OPF", "dispatch"], ["feasible setpoints", "and objective quality"], "#7460a8"],
  [["Market", "sensitivity"], ["network-aware", "constraint signals"], "#4b8c8f"],
  [["Verification", "targets"], ["shortlist cases for", "simulator review"], "#0f766e"],
];

const bottomChips = [
  ["base case", 158],
  ["N-k events", 158],
  ["OPF dispatch", 190],
  ["uncertainty", 168],
  ["market", 132],
  ["emergency control", 210],
];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="1900" height="1080" fill="#fbfaf7"/>
  <path d="M0,902 C420,820 770,890 1090,790 C1340,712 1600,744 1900,660 L1900,1080 L0,1080 Z" fill="#eef3f4"/>
  <g opacity="0.7">
    ${Array.from({ length: 17 }, (_, i) => `<line x1="${150 + i * 96}" y1="170" x2="${60 + i * 96}" y2="910" stroke="#e8ece8" stroke-width="2"/>`).join("")}
    ${Array.from({ length: 8 }, (_, i) => `<line x1="84" y1="${230 + i * 82}" x2="1815" y2="${180 + i * 82}" stroke="#e8ece8" stroke-width="2"/>`).join("")}
  </g>

  ${text({ x: 88, y: 96, lines: "Transmission intelligence framework", size: 50, weight: 720, fill: "#071d38" })}
  ${text({
    x: 88,
    y: 146,
    lines: "One MIND FM x (Grid Agent) maps changing network conditions into prediction, risk, OPF dispatch, and verification products.",
    size: 25,
    weight: 500,
    fill: "#5e6874",
  })}

  ${roundedRect({ x: 80, y: 206, w: 475, h: 650, r: 24, fill: "#ffffff", stroke: "#d6dfdc", sw: 2.4 })}
  <rect x="80" y="206" width="475" height="8" rx="4" fill="#2d71b8"/>
  ${text({ x: 116, y: 272, lines: "Transmission context", size: 34, weight: 720, fill: "#0b1f33" })}
  ${text({ x: 116, y: 312, lines: ["What the engine reads before", "screening, dispatch, or verification."], size: 21, weight: 500, fill: "#657386", lh: 1.28 })}
  ${leftCards
    .map(([title, body, accent], i) =>
      card({
        x: 116,
        y: 352 + i * 124,
        w: 404,
        h: 106,
        title,
        body,
        accent,
        bodyY: 76,
      }),
    )
    .join("")}

  ${arrow({ x1: 590, y1: 526, x2: 760, y2: 526, color: "#2d71b8" })}

  ${roundedRect({ x: 728, y: 214, w: 444, h: 636, r: 26, fill: "#071d38", stroke: "#071d38", sw: 2 })}
  ${text({ x: 950, y: 284, lines: "MIND FM x (Grid Agent)", size: 30, weight: 760, fill: "#ffffff", anchor: "middle" })}
  ${text({ x: 950, y: 322, lines: ["Manifold-Informed", "Neural Dual-encoder"], size: 24, weight: 600, fill: "#b9d8ce", anchor: "middle", lh: 1.18 })}
  ${miniGrid({ x: 798, y: 380, w: 304, h: 188 })}
  ${pill({ x: 790, y: 612, w: 322, h: 52, label: "shared operating geometry", fill: "#102d48", stroke: "#2d5d7c", color: "#d7e8ef" })}
  ${pill({ x: 790, y: 684, w: 322, h: 52, label: "objective-conditioned policy", fill: "#102d48", stroke: "#2d5d7c", color: "#d7e8ef" })}
  ${pill({ x: 790, y: 756, w: 322, h: 52, label: "fast feasibility-aware output", fill: "#102d48", stroke: "#2d5d7c", color: "#d7e8ef" })}

  ${arrow({ x1: 1210, y1: 526, x2: 1380, y2: 526, color: "#2c8b66" })}

  ${roundedRect({ x: 1344, y: 206, w: 476, h: 650, r: 24, fill: "#ffffff", stroke: "#d6dfdc", sw: 2.4 })}
  <rect x="1344" y="206" width="476" height="8" rx="4" fill="#2c8b66"/>
  ${text({ x: 1382, y: 272, lines: "Decision products", size: 34, weight: 720, fill: "#0b1f33" })}
  ${text({ x: 1382, y: 312, lines: ["What teams can screen, optimize,", "rank, and verify from the same engine."], size: 21, weight: 500, fill: "#657386", lh: 1.32 })}
  ${decisionCards
    .map(([title, body, accent], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      return card({
        x: 1382 + col * 214,
        y: 368 + row * 150,
        w: 188,
        h: 128,
        title,
        body,
        accent,
        titleSize: 24,
        bodySize: 18,
        titleY: 42,
        bodyY: 92,
      });
    })
    .join("")}

  ${roundedRect({ x: 210, y: 900, w: 1480, h: 96, r: 18, fill: "#ffffff", stroke: "#d5dedc", sw: 2 })}
  ${text({ x: 260, y: 948, lines: "One engine across:", size: 25, weight: 700, fill: "#0b1f33" })}
  ${bottomChips
    .map(([label, chipW], i) =>
      pill({
        x: 520 + bottomChips.slice(0, i).reduce((sum, [, width]) => sum + width + 18, 0),
        y: 918,
        w: chipW,
        h: 50,
        label,
        fill: i % 2 ? "#f5f7fb" : "#eef7f0",
        stroke: i % 2 ? "#ccd7e5" : "#c8ddd0",
        color: i % 2 ? "#2d5275" : "#245d47",
      }),
    )
    .join("")}
</svg>`;

const temp = await mkdtemp(path.join(tmpdir(), "gridmind-framework-"));
const svgPath = path.join(temp, "framework.svg");
await writeFile(svgPath, svg);
await execFileAsync("/opt/homebrew/bin/rsvg-convert", [
  "-w", String(width),
  "-h", String(height),
  "-o", output,
  svgPath,
]);
console.log(output);
