import type { Metadata } from "next";
import { ProductPage } from "../ProductPage";
import { products } from "../product-data";

const product = products[2];

export const metadata: Metadata = {
  title: `${product.name} | MIND FM x (Grid Agent)`,
  description: product.summary,
};

export default function TransmissionIsosPage() {
  return <ProductPage product={product} />;
}
