import type { Metadata } from "next";
import { ProductPage } from "../ProductPage";
import { products } from "../product-data";

const product = products[4];

export const metadata: Metadata = {
  title: `${product.name} | WattsMIND Grid Agent`,
  description: product.summary,
};

export default function FlexibleLoadsPage() {
  return <ProductPage product={product} />;
}
