import { api, HydrateClient } from "@/trpc/server";
import Main from "@/app/_components/main";
import { SignOutButton } from "@clerk/nextjs";

export default async function Home() {
  const { itemCategories } = await api.general.initialSettings();

  return (
    <HydrateClient>
      <Main>
        <div className="flex h-full bg-gradient-to-bl from-primary via-paper to-paper">
          <section className="bg-pape grid justify-between border-r border-primary">
            <div className="">
              <p className="p-2 font-bold">Categories:</p>
              <ul className="flex h-fit flex-col gap-2 p-2 px-3">
                {itemCategories.map((category) => {
                  return (
                    <button
                      key={category}
                      className="rounded-md bg-primary p-2 text-start capitalize text-paper shadow-sm"
                    >
                      {category.replace(/_/g, " ").toLocaleLowerCase()}
                    </button>
                  );
                })}
              </ul>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2 py-2">
              <div className="mx-auto mt-auto self-end rounded-lg bg-red-400 p-2 text-paper shadow-sm">
                <SignOutButton>Signout</SignOutButton>
              </div>
            </div>
          </section>
          <ul>
            <li>
              <p>Total number of Products</p>
            </li>
            <li>
              <p>New Arrival</p>
            </li>
            <li>
              <p>Active Users</p>
            </li>
          </ul>
        </div>
      </Main>
    </HydrateClient>
  );
}
