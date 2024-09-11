import { SignOutButton } from "@clerk/nextjs";

import Button from "@/app/_components/button";
import Main from "@/app/_components/main";
import Paragraph from "@/app/_components/paragraph";
import SuspenseProduct from "@/app/_components/suspenseProduct";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const { itemCategories, newArrivals, totalProducts, totalUsers } =
    await api.general.initialSettings();

  return (
    <HydrateClient>
      <Main>
        <div className="flex h-full bg-gradient-to-bl from-primary via-paper to-paper">
          <section className="grid h-full justify-between border-r border-primary bg-paper">
            <div>
              <p className="p-2 font-bold">Categories:</p>
              <ul className="flex h-fit flex-col gap-2 p-2 px-3">
                {itemCategories.map((category) => {
                  return (
                    <Button key={category}>
                      <Paragraph
                        text={category.replace(/_/g, " ").toLocaleLowerCase()}
                        color="primary"
                        hoverColor="paper"
                        activeColor="secondary"
                      />
                    </Button>
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
              <Paragraph text="Total number of Products" />
              <Paragraph text={`${totalProducts}`} />
            </li>
            <li>
              <Paragraph text="New Arrival" />
              <SuspenseProduct productList={newArrivals} />
            </li>
            <li>
              <Paragraph text="Active Users" />
              <Paragraph text={`${totalUsers}`} />
            </li>
          </ul>
        </div>
      </Main>
    </HydrateClient>
  );
}
