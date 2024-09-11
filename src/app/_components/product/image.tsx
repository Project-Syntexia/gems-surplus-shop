import Image from "next/image";

import type { ProductType } from "@/types/product.schema";
import Input, { type InputType } from "@/app/_components/input";
import Parent from "@/app/_components/parent";

type ProductImageSourceType = {
  image: ProductType["images"][number];
  dimension?: number;
} & Omit<InputType, "label">;

const ProductImage = (props: ProductImageSourceType) => {
  const { image, dimension, ...rest } = props;
  const productimageSourceId = "product-image-source";
  const isHTTP = image.source.startsWith("https");
  const finalDimension = dimension ?? 240;

  return (
    <>
      {isHTTP ? (
        <Parent className="flex items-start justify-start">
          <label htmlFor={productimageSourceId} className="hidden">
            Image Source:
          </label>
          <Image
            alt={image.alternateText}
            src={image.source}
            className="rounded-lg p-1 shadow-sm"
            width={finalDimension}
            height={finalDimension}
            sizes={`${finalDimension}x${finalDimension}`}
          />
        </Parent>
      ) : (
        <Input
          label="Image:"
          id={productimageSourceId}
          placeholder="imageSrc"
          readOnly
          value={image.source}
          {...rest}
        />
      )}
    </>
  );
};

export default ProductImage;
