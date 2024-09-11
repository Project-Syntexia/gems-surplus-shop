import { forwardRef } from "react";

import type { ProductType } from "@/types/product.schema";
import Select, { type SelectType } from "@/app/_components/select";

const categoryOptions: Array<ProductType["category"]> = [
  "ELECTRONICS",
  "FASHION",
  "FURNITURE",
  "HARDWARE_ITEM",
  "MEDIA",
  "TOYS_AND_HOBBIES",
];

type ProductCategoryType = {
  category: ProductType["category"];
} & Omit<SelectType<ProductType["category"]>, "options">;

// TODO: Create Product Category filter in home
const ProductCategory = forwardRef<HTMLButtonElement, ProductCategoryType>(
  (props, ref) => {
    const { category, ...rest } = props;
    const productCategoryId = "product-category";

    return (
      <button ref={ref} className="flex w-full justify-between p-1">
        <Select
          label="Category"
          id={productCategoryId}
          value={category}
          options={categoryOptions.map((value) => ({
            label: value.toLocaleLowerCase(),
            value,
          }))}
          {...rest}
        />
      </button>
    );
  },
);

ProductCategory.displayName = "ProductCategory";

export default ProductCategory;
