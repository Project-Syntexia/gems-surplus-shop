import { type CustomInputType, inputClasses } from ".";
import { fieldContainerClasses } from "@/app/_components/cart";
import type { ProductType } from "@/types/product.schema";

type ProductNameType = {
  name: ProductType["name"];
} & CustomInputType;

const ProductName = (props: ProductNameType) => {
  const { name, ...rest } = props;
  const productNameId = "product-name";

  return (
    <div className={fieldContainerClasses}>
      <label htmlFor={productNameId}>Name:</label>
      <input
        className={inputClasses}
        id={productNameId}
        placeholder="name"
        value={name}
        {...rest}
      />
    </div>
  );
};

export default ProductName;
