import { forwardRef } from "react";

import type { CustomSelectType } from ".";
import type { ProductType } from "@/types/product.schema";

type ProductCategoryType = {
  category: ProductType["category"];
} & CustomSelectType;

const categoryOptions: Array<ProductType["category"]> = [
  "ELECTRONICS",
  "FASHION",
  "FURNITURE",
  "HARDWARE_ITEM",
  "MEDIA",
  "TOYS_AND_HOBBIES",
];

// TODO: Create Product Category filter in home
const ProductCategory = forwardRef<HTMLButtonElement, ProductCategoryType>(
  (props, ref) => {
    const { category, ...rest } = props;
    const productCategoryId = "product-category";
    let productCategorySelectClasses =
      "ative:bg-contrast w-fit rounded-lg border border-primary bg-transparent p-2 capitalize text-primary duration-300 ease-in-out hover:bg-primary hover:text-paper active:text-paper";

    if (rest.disabled) {
      productCategorySelectClasses = `${productCategorySelectClasses} appearance-none`;
    }

    return (
      <button ref={ref} className="flex w-full justify-between p-1">
        <label htmlFor={productCategoryId}>Category:</label>
        <select
          id={productCategoryId}
          className={productCategorySelectClasses}
          value={category}
          {...rest}
        >
          {categoryOptions.map((category) => {
            return (
              <option
                key={category}
                value={category}
                className="bg-primary capitalize"
              >
                {category.toLocaleLowerCase()}
              </option>
            );
          })}
        </select>
      </button>
    );
  },
);

ProductCategory.displayName = "ProductCategory";

export default ProductCategory;
