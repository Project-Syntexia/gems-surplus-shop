import React from "react";
import Header from "./header";
import Footer from "./footer";
import type { ChildrenType } from "@/app/layout";

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
