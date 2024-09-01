import React from "react";

import type { ChildrenType } from "@/app/layout";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";

const Main = ({ children }: ChildrenType) => {
  return (
    <>
      <Header />
      <main className="h-screen bg-paper">{children}</main>
      <Footer />
    </>
  );
};

export default Main;
