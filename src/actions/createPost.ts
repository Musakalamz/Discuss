"use server";

import { z } from "zod";
import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/path";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}
export async function createPost(
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: "You must be signed in to do this",
      },
    };
  }
  
  // revalidatePath;
  // redirect;

  // db;
  // paths;

  return {
    errors: {},
  };

  // TODO: Revalidate the topic show page after creating a topic
}
