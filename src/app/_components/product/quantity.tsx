import type { InputType } from "@/app/_components/input";
import Input from "@/app/_components/input";
import type { ProductType } from "@/types/product.schema";

type ProductQuantityType = {
  quantity: ProductType["quantity"];
} & Omit<InputType, "label">;

const ProductQuantity = (props: ProductQuantityType) => {
  const { quantity, ...rest } = props;
  const productQuantityId = "product-quantity";

  return (
    <Input
      label="Quantity"
      id={productQuantityId}
      placeholder="quantity"
      type="number"
      value={quantity}
      {...rest}
    />
  );
};

export default ProductQuantity;
