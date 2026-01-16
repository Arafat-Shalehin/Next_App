import { notFound } from "next/navigation";
import ItemDetailsView from "@/components/items/ItemDetailsView";
import { getSingleItem } from "@/server/items";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ItemDetailsPage({ params }) {
  const { id } = await params;

  const item = await getSingleItem(id);

  // getSingleItem returns null for invalid/not found (recommended)
  if (!item) notFound();

  return <ItemDetailsView item={item} />;
}
