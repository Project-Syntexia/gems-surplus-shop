import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

const Page = () => {
  return (
    <section>
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
