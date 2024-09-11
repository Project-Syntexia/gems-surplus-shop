import Image from "next/image";

import type { ProductType } from "@/types/product.schema";
import Parent from "@/app/_components/parent";

type ProductImageSourceType = {
  image: ProductType["images"][number];
  dimension?: "16:9";
  size?: number;
};

/** If `dimension` is undefined, the default size would be `square`. */
const ProductImage = (props: ProductImageSourceType) => {
  const { image, dimension, size } = props;
  const productimageSourceId = "product-image-source";
  const finalSize = Math.floor(size ?? 240);
  const nineRatioFromSixteen = (finalSize / 16) * 9;
  const finalHeight = Math.floor(nineRatioFromSixteen);

  return (
    <Parent className="flex items-start justify-start rounded-lg bg-primary">
      <label htmlFor={productimageSourceId} className="hidden">
        Image Source:
      </label>
      <Image
        alt={image.alternateText}
        src={image.source}
        quality={70}
        className="h-full w-full rounded-lg shadow-sm"
        width={finalSize}
        height={dimension === undefined ? finalSize : finalHeight}
        sizes={`${finalSize}x${dimension === undefined ? finalSize : finalHeight}`}
      />
    </Parent>
  );
};

export default ProductImage;
