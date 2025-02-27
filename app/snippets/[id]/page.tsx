import { notFound } from "next/navigation";
import { db } from "@/db";

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

  return <div>{snippet.title}</div>;
};

export default ShowSnippetPage;
