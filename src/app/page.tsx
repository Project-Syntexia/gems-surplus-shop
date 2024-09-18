"use client";

import { useAuth } from "@clerk/nextjs";

import Button from "@/app/_components/button";
import Main from "@/app/_components/main";
import Paragraph from "@/app/_components/paragraph";
import ProductList from "@/app/_components/product-list";
import { api } from "@/trpc/react";
import type { StateType } from "./_components/inputGlobalAccessibility";
import { useGlobalStateContext } from "./_components/state-provider";

export default function Home() {
  const { signOut } = useAuth();
  const disabledTriggers: StateType[] = [
    "logging-in",
    "signing-out",
    "initial",
  ];
  const [{ itemCategories, totalProducts, totalUsers }] =
    api.general.initialSettings.useSuspenseQuery();
  const { inputGlobalAccessibilityService } = useGlobalStateContext();

  function handleSignout() {
    void signOut();
    inputGlobalAccessibilityService.send({ type: "input.signOut" });
  }

  return (
    <Main>
      <div className="flex h-full bg-gradient-to-bl from-primary via-paper to-paper">
        <section className="grid h-full justify-between border-r border-primary bg-paper">
          <div suppressHydrationWarning>
            <p className="p-2 font-bold">Categories:</p>
            <ul className="flex h-fit flex-col gap-2 p-2 px-3">
              {itemCategories.map((category) => {
                return (
                  <Button disabledTrigger={disabledTriggers} key={category}>
                    <Paragraph
                      activeColor="secondary"
                      color="primary"
                      disabledTrigger={disabledTriggers}
                      hoverColor="paper"
                      text={category.replace(/_/g, " ").toLocaleLowerCase()}
                    />
                  </Button>
                );
              })}
            </ul>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2 py-2">
            <div className="mx-auto mt-auto self-end rounded-lg p-2">
              <Button
                bgColor="bg-red-400 hover:bg-red-500"
                borderColor="border-red-400 hover:border-red-500"
                disabledTrigger={disabledTriggers}
                onClick={handleSignout}
              >
                <Paragraph
                  color="paper"
                  disabledTrigger={disabledTriggers}
                  text="signOut"
                />
              </Button>
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
            <ProductList isNewArrivals />
          </li>
          <li>
            <Paragraph text="Active Users" />
            <Paragraph text={`${totalUsers}`} />
          </li>
        </ul>
      </div>
    </Main>
  );
}
