import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const output = path.join(root, "public", "product03-opf-summary.png");
const width = 1800;
const height = 720;

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

function text({ x, y, lines, size = 24, weight = 500, fill = "#0b1f33", anchor = "start", lh = 1.28 }) {
  const rows = Array.isArray(lines) ? lines : [lines];
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Inter, Helvetica Neue, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">
    ${rows
      .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : size * lh}">${esc(line)}</tspan>`)
      .join("")}
  </text>`;
}

function rect({ x, y, w, h, r = 18, fill = "#ffffff", stroke = "#d7ded8", sw = 2 }) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function metric({ x, y, w, h, value, label, accent = "#2c8b66" }) {
  return `<g>
    ${rect({ x, y, w, h, r: 14, fill: "#fbfcfa", stroke: "#dfe5df", sw: 1.6 })}
    <rect x="${x}" y="${y}" width="${w}" height="6" rx="3" fill="${accent}"/>
    ${text({ x: x + 22, y: y + 54, lines: value, size: 38, weight: 720, fill: "#071d38" })}
    ${text({ x: x + 22, y: y + 90, lines: label, size: 19, weight: 530, fill: "#5e6874", lh: 1.25 })}
  </g>`;
}

function panel({ x, y, title, subtitle, metrics, accent }) {
  const cardW = 800;
  const tileW = 348;
  const tileH = 128;
  return `<g>
    ${rect({ x, y, w: cardW, h: 520, r: 22, fill: "#ffffff", stroke: "#d7ded8", sw: 2 })}
    <rect x="${x}" y="${y}" width="${cardW}" height="8" rx="4" fill="${accent}"/>
    ${text({ x: x + 36, y: y + 70, lines: title, size: 38, weight: 760, fill: "#071d38" })}
    ${text({ x: x + 36, y: y + 108, lines: subtitle, size: 22, weight: 520, fill: "#667586" })}
    ${metrics
      .map((item, index) =>
        metric({
          x: x + 36 + (index % 2) * 382,
          y: y + 162 + Math.floor(index / 2) * 158,
          w: tileW,
          h: tileH,
          value: item[0],
          label: item[1],
          accent: item[2] ?? accent,
        }),
      )
      .join("")}
  </g>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#fbfaf7"/>
  <path d="M0,600 C360,548 655,614 1000,548 C1280,494 1490,516 1800,454 L1800,720 L0,720 Z" fill="#eef3f4"/>

  ${text({ x: 70, y: 76, lines: "Application 02: OPF and uncertain OPF", size: 48, weight: 760, fill: "#071d38" })}
  ${text({
    x: 70,
    y: 124,
    lines: "MIND FM x (Grid Agent) turns multi-objective operating priorities into fast, feasible dispatch decisions under nominal and uncertain network conditions.",
    size: 24,
    weight: 500,
    fill: "#5e6874",
  })}

  ${panel({
    x: 70,
    y: 170,
    title: "Nominal OPF",
    subtitle: "IEEE 30-bus, 300-step dispatch rollout",
    accent: "#2d71b8",
    metrics: [
      ["100.0%", ["feasible dispatch", "over the rollout"], "#2c8b66"],
      ["0.30%", ["mean gap to", "nonlinear oracle"], "#2d71b8"],
      ["12.3 ms", ["decision latency", "per step"], "#c58b27"],
      ["97.1x", ["lower latency", "than MPC"], "#7460a8"],
    ],
  })}

  ${panel({
    x: 930,
    y: 170,
    title: "Uncertain OPF",
    subtitle: "IEEE 30-bus with branch-admittance uncertainty",
    accent: "#2c8b66",
    metrics: [
      ["100.0%", ["feasible dispatch", "under uncertainty"], "#2c8b66"],
      ["0.74%", ["mean gap to", "nonlinear oracle"], "#2d71b8"],
      ["12.6 ms", ["decision latency", "per step"], "#c58b27"],
      ["97.5x", ["lower latency", "than MPC"], "#7460a8"],
    ],
  })}
</svg>`;

const temp = await mkdtemp(path.join(tmpdir(), "gridmind-opf-"));
const svgPath = path.join(temp, "opf.svg");
await writeFile(svgPath, svg);
await execFileAsync("/opt/homebrew/bin/rsvg-convert", [
  "-w", String(width),
  "-h", String(height),
  "-o", output,
  svgPath,
]);
console.log(output);
