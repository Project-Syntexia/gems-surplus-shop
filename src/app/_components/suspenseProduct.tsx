import React, { Suspense } from "react";

import Button from "@/app/_components/button";
import Paragraph from "@/app/_components/paragraph";
import Parent from "@/app/_components/parent";
import ProductButton from "@/app/_components/product/button";
import type { ProductType } from "@/types/product.schema";

type SuspenseProductType = { productList: ProductType[] };

const suspenseProductContainerClasses = "grid grid-cols-4 gap-2 p-2 pb-20";

const SuspenseProductFallback = () => {
  return (
    <Parent className={suspenseProductContainerClasses}>
      <Button disabled>
        <Paragraph
          text="Loading..."
          color={"black"}
          activeColor={"black"}
          hoverColor={"black"}
        />
      </Button>
    </Parent>
  );
};

const SuspenseProduct = (props: SuspenseProductType) => {
  const { productList } = props;
  return (
    <Suspense fallback={<SuspenseProductFallback />}>
      <Parent className={suspenseProductContainerClasses}>
        {productList.map((data) => {
          return <ProductButton key={data.id} {...data} />;
        })}
      </Parent>
    </Suspense>
  );
};

export default SuspenseProduct;
