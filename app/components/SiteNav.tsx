type SiteNavProps = {
  context?: "home" | "internal";
};

export function SiteNav({ context = "internal" }: SiteNavProps) {
  const homeHref = context === "home" ? "#top" : "/";

  return (
    <nav className="topbar" aria-label="Primary navigation">
      <a className="brand" href={homeHref} aria-label="MIND FM x (Grid Agent) home">
        <span className="brand-mark" aria-hidden="true">
          M
        </span>
        <span>MIND FM x (Grid Agent)</span>
      </a>
      <div className="nav-links" aria-label="Site sections">
        <a href="/platform">Platform</a>
        <a href="/technology">Technology</a>
        <a href="/validation">Validation</a>
        <a href="/#themes">Research Themes</a>
        <a href="/acknowledgment">Acknowledgment</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
}
