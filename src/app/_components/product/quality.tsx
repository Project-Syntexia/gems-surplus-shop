import type { SelectType } from "@/app/_components/select";
import Select from "@/app/_components/select";
import type { ProductType } from "@/types/product.schema";

type ProductQualityType = {
  quality: ProductType["quality"];
} & Omit<SelectType<ProductType["quality"]>, "options" | "label">;

const qualityOptions: Array<ProductType["quality"]> = [
  "LIKE_BRAND_NEW",
  "SLIGHTLY_USED",
  "USED",
];

const ProductQuality = (props: ProductQualityType) => {
  const { quality, ...rest } = props;
  const productQualityId = "product-quality";

  return (
    <Select
      label="Quality"
      id={productQualityId}
      options={qualityOptions.map((value) => ({
        label: value.replace(/_/g, " ").toLowerCase(),
        value,
      }))}
      value={quality}
      {...rest}
    />
  );
};

export default ProductQuality;
