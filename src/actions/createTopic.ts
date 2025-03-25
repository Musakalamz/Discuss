"use server";

import { auth } from "@/auth";
import { z } from "zod";
import type { Topic } from "@prisma/client";
import { db } from "@/db";
import { redirect } from "next/navigation";
import paths from "@/path";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  // const name = formData.get("name");
  // const description = formData.get("description");
  // console.log(name, description);

  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  // console.log(result);

  if (!result.success) {
    // console.log(result.error);
    // console.log(result.error.flatten().fieldErrors);

    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }

  let topic: Topic;

  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect(paths.topicShowPath(topic.slug));
}
