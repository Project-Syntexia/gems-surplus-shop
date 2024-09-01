"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  function goBack() {
    router.back();
  }

  return (
    <section>
      <button onClick={goBack}>Back</button>
      <h2>Settings</h2>
      <div>
        <SignedIn>
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          {/* TODO: Add User to Database */}
          <SignInButton />
        </SignedOut>
      </div>
    </section>
  );
};

export default Page;
