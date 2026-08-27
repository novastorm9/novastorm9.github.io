type SiteNavProps = {
  context?: "home" | "internal";
};

export function SiteNav({ context = "internal" }: SiteNavProps) {
  const homeHref = context === "home" ? "#top" : "/";

  return (
    <nav className="topbar" aria-label="Primary navigation">
      <a className="brand" href={homeHref} aria-label="WattsMIND Grid Agent home">
        <span className="brand-mark" aria-hidden="true">
          W
        </span>
        <span>WattsMIND Grid Agent</span>
      </a>
      <div className="nav-links" aria-label="Site sections">
        <a href="/platform">Platform</a>
        <a href="/technology">Technology</a>
        <a href="/#products">Products</a>
        <a href="/validation">Validation</a>
        <a href="/customers">Customers</a>
        <a href="/company">Company</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
}
