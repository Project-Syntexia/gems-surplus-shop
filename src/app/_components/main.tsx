import type { ChildrenType } from "@/app/layout";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";

type MainType = {
  isOverlapping?: true;
} & ChildrenType;

const Main = (props: MainType) => {
  const { children, isOverlapping } = props;
  const commonClasses = "bg-paper";
  const mainClasses = `${isOverlapping ? "min-h-screen h-full" : "h-screen"} ${commonClasses}`;

  return (
    <>
      <Header />
      <main className={mainClasses}>{children}</main>
      <Footer />
    </>
  );
};

export default Main;
