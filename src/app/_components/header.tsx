import Link from "next/link";
import React from "react";

import { defaultRouteName, pages, pagesRouting } from "@/utils/pages";
import { EMPTY_STRING } from "@/utils/const";

const Header = () => {
  return (
    <header className="bg-primary p-2">
      <nav>
        <ul className="flex items-center justify-around gap-2">
          {[...pages.filter((v) => v !== "login")].sort().map((page) => {
            const pageRoute = pagesRouting(page);
            const pageName = page === EMPTY_STRING ? defaultRouteName : page;

            return (
              <li key={pageRoute} className="capitalize text-paper">
                <Link href={pageRoute}>{pageName}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
