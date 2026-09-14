import { getCategories, getProducts } from "@/lib/data/store";
import AdminCustomizerClient from "@/components/admin/AdminCustomizerClient";

export const metadata = {
  title: "Customizer Settings | Admin CRM | GLOVES STORM",
};

export default async function AdminCustomizerPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="space-y-6">
      <AdminCustomizerClient categories={categories} products={products} />
    </div>
  );
}
