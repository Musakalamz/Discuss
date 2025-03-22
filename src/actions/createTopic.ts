"use server";

import { auth } from "@/auth";
import { z } from "zod";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

interface createTopicStateForm {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: createTopicStateForm,
  formData: FormData
): Promise<createTopicStateForm> {
  // const name = formData.get("name");
  // const description = formData.get("description");
  // console.log(name, description);

  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    // console.log(result.error);
    console.log(result.error.flatten().fieldErrors);

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

  return {
    errors: {},
  };

  // TODO: Revalidate the homepage after creating a topic
}
