"use client";

import { createTopic } from "@/actions";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import { startTransition, useActionState } from "react";

export default function TopicCreateForm() {
  const [formState, action] = useActionState(createTopic, {
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button color="primary">Create A Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action} onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create A Topic</h3>
            <Input
              name="name"
              aria-label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />

            {/* if we were not using nextUi, we would use the below div to get the error message out of the form */}
            {/* <div className="bg-red-400">{formState.errors.name.join(", ")}</div> */}

            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="describe your topic"
              isInvalid={!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />

            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border border-red-400 rounded">
                {" "}
                {formState.errors._form?.join(", ")}{" "}
              </div>
            ) : null}

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
