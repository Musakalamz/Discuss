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
import { useActionState } from "react";

export default function TopicCreateForm() {
  const [formState, action] = useActionState(createTopic, {
    errors: {},
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button color="primary">Create A Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create A Topic</h3>
            <Input
              name="name"
              aria-label="Name"
              labelPlacement="outside"
              placeholder="Name"
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="describe your topic"
            />
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
