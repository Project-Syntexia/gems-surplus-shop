import type { ChildrenType } from "@/app/layout";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import useInputGlobalInitialize from "../hooks/useInputGlobalInitialize";

type MainType = {
  isOverlapping?: true;
} & ChildrenType;

/**
 * Initialize all the States here from the XState.
 */
const Main = (props: Omit<MainType, "className">) => {
  const { children, isOverlapping } = props;
  const commonClasses = "bg-paper";
  const mainClasses = `${isOverlapping ? "min-h-screen h-full" : "h-screen"} ${commonClasses}`;

  useInputGlobalInitialize();

  return (
    <>
      <Header />
      <main className={mainClasses}>{children}</main>
      <Footer />
    </>
  );
};

export default Main;
