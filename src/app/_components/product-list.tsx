import React, { Suspense } from "react";

import Button from "@/app/_components/button";
import Paragraph from "@/app/_components/paragraph";
import Parent from "@/app/_components/parent";
import ProductButton from "@/app/_components/product/button";
import { useGlobalStateContext } from "@/app/_components/state-provider";
import { useSelector } from "@xstate/react";

type ProductListType = {
  isNewArrivals?: boolean;
};

const productContainerClasses =
  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2 pb-20";

const ProductListFallback = () => {
  return (
    <Parent className={productContainerClasses}>
      <Button disabledTrigger={["initial", "logging-in", "signing-out"]}>
        <Paragraph
          activeColor={"black"}
          color={"black"}
          disabledTrigger={["initial", "logging-in", "signing-out"]}
          hoverColor={"black"}
          text="Loading..."
        />
      </Button>
    </Parent>
  );
};

const ProductList = (props: ProductListType) => {
  const { isNewArrivals } = props;
  const { productService } = useGlobalStateContext();
  const productList = useSelector(productService, (snapshot) => {
    if (isNewArrivals) return snapshot.context.initialProducts;
    return snapshot.context.activeProducts;
  });

  return (
    <Suspense fallback={<ProductListFallback />}>
      <Parent className={productContainerClasses}>
        {productList.map((data) => {
          return <ProductButton key={data.id} {...data} />;
        })}
      </Parent>
    </Suspense>
  );
};

export default ProductList;
