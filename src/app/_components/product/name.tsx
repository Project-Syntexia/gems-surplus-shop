import Input, { type InputType } from "@/app/_components/input";
import type { ProductType } from "@/types/product.schema";

type ProductNameType = {
  name: ProductType["name"];
} & Omit<InputType, "label">;

const ProductName = (props: ProductNameType) => {
  const { name, ...rest } = props;
  const productNameId = "product-name";

  return (
    <Input
      id={productNameId}
      label="Name"
      placeholder="name"
      value={name}
      {...rest}
    />
  );
};

export default ProductName;
