import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const title = "Gem's Surplus Consumer Goods Trading";
  return (
    <HydrateClient>
      <main className="flex h-screen items-center justify-center bg-gradient-to-r from-primary to-secondary">
        <h1 className="text-stroke relative select-none bg-transparent text-center text-5xl font-bold tracking-tighter text-paper">
          {title}
        </h1>
      </main>
    </HydrateClient>
  );
}
