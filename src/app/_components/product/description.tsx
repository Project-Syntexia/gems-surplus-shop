import Input, { type InputType } from "@/app/_components/input";
import type { ProductType } from "@/types/product.schema";

type ProductDescriptionType = {
  description: ProductType["description"];
} & Omit<InputType, "label">;

const ProductDescription = (props: ProductDescriptionType) => {
  const { description, ...rest } = props;
  const productDescriptionId = "product-description";

  return (
    <Input
      label="Description"
      id={productDescriptionId}
      placeholder="description"
      value={description}
      {...rest}
    />
  );
};

export default ProductDescription;
