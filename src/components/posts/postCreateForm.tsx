"use client";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import { useActionState } from "react";
import * as actions from "@/actions";
import FormButton from "../common/formButton";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action, isPending] = useActionState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>

      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 w-80 p-4">
            <h3 className="text-lg">Create a Post</h3>

            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />

            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content of your Post"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
          </div>

          {formState.errors._form ? (
            <div className="p-2 bg-red-200 border border-red-400 rounded">
              {" "}
              {formState.errors._form?.join(", ")}{" "}
            </div>
          ) : null}

          <FormButton isLoading={isPending}>Create Post</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
}
