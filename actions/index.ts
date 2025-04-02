"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const editSnippet = async (id: number, code: string) => {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  revalidatePath(`/snippets/${id}`); // Revalidate the specific snippet page to show the updated code
  redirect(`/snippets/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath("/"); // Revalidate the home page to show the updated list of snippets
  redirect("/");
};

export const createSnippet = async (
  formState: { message: string },
  formData: FormData
) => {
  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be longer",
      };
    }

    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer",
      };
    }

    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong...",
      };
    }
  }

  revalidatePath("/"); // Revalidate the home page to show the updated list of snippets
  redirect("/");
};
