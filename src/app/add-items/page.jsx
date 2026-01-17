import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import AddItemForm from "@/components/items/AddItemForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AddItemsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/login?next=${encodeURIComponent("/add-items")}`);
  }

  return (
    <main className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <AddItemForm />
      </div>
    </main>
  );
}
