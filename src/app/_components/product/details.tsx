import ProductCategory from "@/app/_components/product/category";
import ProductDescription from "@/app/_components/product/description";
import ProductImage from "@/app/_components/product/image";
import ProductName from "@/app/_components/product/name";
import ProductPrice from "@/app/_components/product/price";
import ProductQuality from "@/app/_components/product/quality";
import ProductQuantity from "@/app/_components/product/quantity";
import type { ProductType } from "@/types/product.schema";

type ProductDetailsType = ProductType & {
  isDisabled?: true;
};

const ProductDetails = (props: ProductDetailsType) => {
  const { name, description, images, quantity, quality, price } = props;
  const isDisabled = props.isDisabled ?? false;

  return (
    <>
      <ProductImage
        disabled={isDisabled}
        image={images[0]!}
        readOnly={isDisabled}
      />
      <ProductName disabled={isDisabled} name={name} readOnly={isDisabled} />
      <ProductDescription
        description={description}
        disabled={isDisabled}
        readOnly={isDisabled}
      />
      <ProductQuantity
        disabled={isDisabled}
        quantity={quantity}
        readOnly={isDisabled}
      />
      <ProductQuality
        disabled={isDisabled}
        quality={quality}
        readOnly={isDisabled}
      />
      <ProductPrice disabled={isDisabled} price={price} />
      <ProductCategory
        category={props.category}
        disabled={isDisabled}
        label="Category"
        readOnly={isDisabled}
      />
    </>
  );
};

export default ProductDetails;
