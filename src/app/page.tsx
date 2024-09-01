import { HydrateClient } from "@/trpc/server";
import Main from "@/app/_components/main";
import { SHOP_NAME } from "@/app/utils/const";

export default async function Home() {
  return (
    <HydrateClient>
      <Main>
        <div className="flex h-full items-center justify-center bg-gradient-to-r from-primary to-secondary">
          <h1 className="text-stroke relative select-none bg-transparent text-center text-5xl font-bold tracking-tighter text-paper">
            {SHOP_NAME}
          </h1>
        </div>
      </Main>
    </HydrateClient>
  );
}
