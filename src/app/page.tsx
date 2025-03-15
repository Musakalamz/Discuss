import { signIn, signOut } from "@/actions";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <div>
      <form action={signIn}>
        <Button type="submit"> Sign In </Button>
      </form>

      <form action={signOut}>
        <Button type="submit"> Sign Out </Button>
      </form>
    </div>
  );
}
