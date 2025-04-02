import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/comopnents/snippet-edit-form";
interface SnippetEditPageProps {
  params: Promise<{
    id: string;
  }>;
}
const SnippetEditPage = async ({ params }: SnippetEditPageProps) => {
  const { id } = await params;
  const snippetId = parseInt(id);
  const snippet = await db.snippet.findFirst({
    where: { id: snippetId },
  });
  if (!snippet) {
    return notFound();
  }
  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
};
export default SnippetEditPage;
