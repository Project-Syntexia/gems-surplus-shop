import Link from "next/link";
import React from "react";

import { pages, pagesRouting } from "@/app/utils/pages";
import { EMPTY_STRING } from "@/app/utils/const";

const Header = () => {
  return (
    <header className="bg-paper p-2">
      <nav className="bg-secondary">
        <ul className="flex items-center justify-between gap-2">
          {[...pages].sort().map((page) => {
            const pageRoute = pagesRouting(page);
            const pageName = page === EMPTY_STRING ? "home" : page;

            return (
              <li key={pageRoute} className="capitalize">
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
