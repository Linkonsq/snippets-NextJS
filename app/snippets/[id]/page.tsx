import { notFound } from "next/navigation";
import { db } from "@/db";
import Link from "next/link";
import * as actions from "@/actions";

interface ShowSnippetPageProps {
  params: {
    id: string;
  };
}

const ShowSnippetPage = async (props: ShowSnippetPageProps) => {
  const { id } = props.params;

  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!snippet) {
    notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1>{snippet.title}</h1>;
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default ShowSnippetPage;

// This function is used to generate static paths for the dynamic route
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => ({
    id: snippet.id.toString(),
  }));
}
