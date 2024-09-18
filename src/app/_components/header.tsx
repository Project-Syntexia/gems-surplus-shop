import Link from "next/link";
import React from "react";

import { defaultRouteName, pages, pagesRouting } from "@/utils/pages";
import { EMPTY_STRING } from "@/utils/const";
import Button from "./button";

const Header = () => {
  return (
    <header className="bg-primary p-2">
      <nav>
        <ul className="flex items-center justify-around gap-2">
          {[...pages.filter((v) => v !== "login")].sort().map((page) => {
            const pageRoute = pagesRouting(page);
            const pageName = page === EMPTY_STRING ? defaultRouteName : page;

            return (
              <li key={pageRoute}>
                <Button
                  noDisabledStyle
                  style="capitalize text-paper shadow-none"
                  bgColor="bg-transparent"
                  borderColor="border-transparent"
                  disabledTrigger={["initial", "logging-in", "signing-out"]}
                >
                  <Link href={pageRoute}>{pageName}</Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
