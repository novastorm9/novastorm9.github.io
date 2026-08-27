import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";
import { products } from "../products/product-data";

export const metadata: Metadata = {
  title: "Customers | WattsMIND Grid Agent",
  description:
    "Customer segments for WattsMIND Grid Agent across utilities, software vendors, operators, market participants, and flexible loads.",
};

export default function CustomersPage() {
  return (
    <main className="site-shell internal-shell">
      <SiteNav />
      <section className="internal-hero">
        <p className="eyebrow">Customers</p>
        <h1>Built for grid teams that need AI to survive real network change.</h1>
        <p>
          WattsMIND Grid Agent is being shaped around five commercial entry points. Each
          one is a different buyer path, but all reuse the same transferable
          grid intelligence layer.
        </p>
      </section>
      <section className="internal-grid customer-grid">
        {products.map((product) => (
          <a href={`/products/${product.slug}`} key={product.slug}>
            <span>{product.eyebrow}</span>
            <h3>{product.name}</h3>
            <p>{product.summary}</p>
          </a>
        ))}
      </section>
      <section className="next-links">
        <a href="/#products">Product index</a>
        <a href="/company">Company</a>
        <a href="/contact">Start discovery</a>
      </section>
    </main>
  );
}
