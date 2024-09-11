import { type CustomSelectType, selectClasses } from ".";
import { fieldContainerClasses } from "@/app/_components/cart";
import type { ProductType } from "@/types/product.schema";

type ProductQualityType = {
  quality: ProductType["quality"];
} & CustomSelectType;

const qualityOptions: Array<ProductType["quality"]> = [
  "LIKE_BRAND_NEW",
  "SLIGHTLY_USED",
  "USED",
];

const ProductQuality = (props: ProductQualityType) => {
  const { quality, ...rest } = props;
  const productQualityId = "product-quality";

  return (
    <div className={fieldContainerClasses}>
      <label htmlFor={productQualityId}>Quality</label>
      <select
        id={productQualityId}
        value={quality}
        className={selectClasses}
        {...rest}
      >
        {qualityOptions.map((option) => {
          const formattedOption = option.toLocaleLowerCase();
          return (
            <option key={option} value={option} className="capitalize">
              {formattedOption.replace(/_/g, " ")}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ProductQuality;
