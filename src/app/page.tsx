import { signIn } from "@/actions";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <div>
      <form action={signIn}>
        <Button type="submit"> Click me </Button>
      </form>
    </div>
  );
}
