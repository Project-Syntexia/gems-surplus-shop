import { type CustomInputType, inputClasses } from ".";
import { fieldContainerClasses } from "@/app/_components/cart";
import type { ProductType } from "@/types/product.schema";

type ProductQuantityType = {
  quantity: ProductType["quantity"];
} & CustomInputType;

const ProductQuantity = (props: ProductQuantityType) => {
  const { quantity, ...rest } = props;
  const productQuantityId = "product-quantity";

  return (
    <div className={fieldContainerClasses}>
      <label htmlFor={productQuantityId}>Quantity</label>
      <input
        id={productQuantityId}
        placeholder="quantity"
        className={inputClasses}
        type="number"
        value={quantity}
        {...rest}
      />
    </div>
  );
};

export default ProductQuantity;
