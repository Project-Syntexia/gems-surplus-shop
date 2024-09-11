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
        image={images[0]!}
        disabled={isDisabled}
        readOnly={isDisabled}
      />
      <ProductName name={name} disabled={isDisabled} readOnly={isDisabled} />
      <ProductDescription
        description={description}
        disabled={isDisabled}
        readOnly={isDisabled}
      />
      <ProductQuantity
        quantity={quantity}
        disabled={isDisabled}
        readOnly={isDisabled}
      />
      <ProductQuality
        quality={quality}
        disabled={isDisabled}
        readOnly={isDisabled}
      />
      <ProductPrice
        price={price}
        input={{
          disabled: isDisabled,
        }}
        select={{
          disabled: isDisabled,
        }}
      />
      <ProductCategory
        category={props.category}
        disabled={isDisabled}
        readOnly={isDisabled}
      />
    </>
  );
};

export default ProductDetails;
