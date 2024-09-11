import Image from "next/image";

import { type CustomInputType, inputClasses } from ".";
import type { ProductType } from "@/types/product.schema";

type ProductImageSourceType = {
  image: ProductType["images"][number];
  dimension?: number;
} & CustomInputType;

const ProductImage = (props: ProductImageSourceType) => {
  const { image, dimension, ...rest } = props;
  const productimageSourceId = "product-image-source";
  const isHTTP = image.source.startsWith("https");
  const finalDimension = dimension ?? 240;

  return (
    <div className="flex items-start justify-start">
      <label htmlFor={productimageSourceId} className="hidden">
        Image Source:
      </label>
      {isHTTP ? (
        <Image
          alt={image.alternateText}
          src={image.source}
          className="rounded-lg p-1 shadow-sm"
          width={finalDimension}
          height={finalDimension}
          sizes={`${finalDimension}x${finalDimension}`}
        />
      ) : (
        <input
          id={productimageSourceId}
          className={inputClasses}
          placeholder="imageSrc"
          readOnly
          value={image.source}
          {...rest}
        />
      )}
    </div>
  );
};

export default ProductImage;
