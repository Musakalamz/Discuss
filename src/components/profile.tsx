"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  console.log(session);

  if (session.data?.user) {
    return (
      <div>
        From Client, User is signed in {JSON.stringify(session.data.user)}{" "}
      </div>
    );
  }

  return <div> From Client User is NOT signed in</div>;
}
