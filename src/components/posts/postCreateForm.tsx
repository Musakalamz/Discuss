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

export default function PostCreateForm() {
  const [] = useActionState();

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>

      <PopoverContent>
        <form>
          <div className="flex flex-col gap-4 w-80 p-4">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              placeholder="Title"
              labelPlacement="outside"
            />

            <Input
              name="content"
              label="Content"
              placeholder="Content"
              labelPlacement="outside"
            />
          </div>
          <FormButton>Create Post</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
}
