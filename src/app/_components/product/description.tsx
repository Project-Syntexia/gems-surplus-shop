import { type CustomInputType, inputClasses } from ".";
import { fieldContainerClasses } from "@/app/_components/cart";
import type { ProductType } from "@/types/product.schema";

type ProductDescriptionType = {
  description: ProductType["description"];
} & CustomInputType;

const ProductDescription = (props: ProductDescriptionType) => {
  const { description, ...rest } = props;
  const productDescriptionId = "product-description";

  return (
    <div className={fieldContainerClasses}>
      <label htmlFor={productDescriptionId}>Description:</label>
      <input
        id={productDescriptionId}
        placeholder="description"
        className={inputClasses}
        value={description}
        {...rest}
      />
    </div>
  );
};

export default ProductDescription;
