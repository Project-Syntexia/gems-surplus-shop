import React, { forwardRef } from "react";
import { z } from "zod";

import {
  cartButtonClasses,
  cartParagraphClasses,
  fieldContainerClasses,
} from "@/app/_components/cart";
import { productSchema } from "@/server/api/routers/product";

export type ProductType = z.infer<typeof productSchema>;

type CustomInputType = Partial<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>;
type CustomSelectType = Partial<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
>;

export const productDetailsContainerClasses =
  "mx-auto flex w-max flex-col items-center justify-center rounded-lg border p-2 shadow-sm";

const qualityOptions: Array<ProductType["quality"]> = [
  "LIKE_BRAND_NEW",
  "SLIGHTLY_USED",
  "USED",
];

type ProductDetailsType = z.infer<typeof productSchema> & {
  isDisabled?: true;
};
const ProductDetails = (props: ProductDetailsType) => {
  const { name, description, imageSrc, quantity, quality, price } = props;
  const isDisabled = props.isDisabled ?? false;

  return (
    <>
      <ProductName name={name} disabled={isDisabled} />
      <ProductDescription description={description} disabled={isDisabled} />
      <ProductImage src={imageSrc} disabled={isDisabled} />
      <ProductQuantity quantity={quantity} disabled={isDisabled} />
      <ProductQuality quality={quality} disabled={isDisabled} />
      <ProductPrice
        price={price}
        input={{
          disabled: isDisabled,
        }}
        select={{
          disabled: isDisabled,
        }}
      />
      <ProductCategory category={props.category} />
    </>
  );
};

type ProductNameType = {
  name: ProductType["name"];
} & CustomInputType;
export const ProductName = (props: ProductNameType) => {
  const { name, ...rest } = props;
  const productNameId = "product-name"

  return (
    <div className={fieldContainerClasses}>
      <label htmlFor={productNameId}>Name:</label>
      <input id={productNameId} placeholder="name" value={name} {...rest} />
    </div>
  );
};

type ProductDescriptionType = {
  description: ProductType["description"];
} & CustomInputType;
export const ProductDescription = (props: ProductDescriptionType) => {
  const { description, ...rest } = props;
  const productDescriptionId = "product-description"

  return (
    <div className={fieldContainerClasses}>
      <label htmlFor={productDescriptionId}>Description:</label>
      <input
        id={productDescriptionId}
        placeholder="description"
        value={description}
        {...rest}
      />
    </div>
  );
};

type ProductImageSourceType = {
  src: ProductType["imageSrc"];
} & CustomInputType;
export const ProductImage = (props: ProductImageSourceType) => {
  const { src, ...rest } = props;
  const productimageSourceId = "product-image-source"

  return (
    <div className={fieldContainerClasses}>
      <label htmlFor={productimageSourceId}>Image Source:</label>
      <input
        id={productimageSourceId}
        placeholder="imageSrc"
        value={src}
        {...rest}
      />
    </div>
  );
};

type ProductQuantityType = {
  quantity: ProductType["quantity"];
} & CustomInputType;
export const ProductQuantity = (props: ProductQuantityType) => {
  const { quantity, ...rest } = props;
  const productQuantityId = "product-quantity"

  return (
    <div className={fieldContainerClasses}>
      <label htmlFor={productQuantityId}>Quantity</label>
      <input
        id={productQuantityId}
        placeholder="quantity"
        type="number"
        value={quantity}
        {...rest}
      />
    </div>
  );
};

type ProductQualityType = {
  quality: ProductType["quality"];
} & CustomSelectType;
export const ProductQuality = (props: ProductQualityType) => {
  const { quality, ...rest } = props;
  const productQualityId = "product-quality"

  return (
    <div className={fieldContainerClasses}>
      <label htmlFor={productQualityId}>Quality</label>
      <select id={productQualityId} value={quality} {...rest}>
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

type ProductPriceType = { price: ProductType["price"] } & {
  input: CustomInputType;
} & {
  select: CustomSelectType;
};
export const ProductPrice = (props: ProductPriceType) => {
  const { value, currency } = props.price;
  const productPriceId = "product-price"
  const productCurrencyId = "product-currency"

  return (
    <section className="grid grid-flow-col gap-2">
      <div className={fieldContainerClasses}>
        <label htmlFor={productPriceId}>Price</label>
        <input
          id={productPriceId}
          placeholder="price"
          type="number"
          value={value}
          {...props.input}
        />
      </div>
      <div className={fieldContainerClasses}>
        <label htmlFor={productCurrencyId}>Currency</label>
        <select id={productCurrencyId} value={currency} {...props.select}>
          <option>PHP</option>
        </select>
      </div>
    </section>
  );
};

type ProductCategoryType = {
  category: z.infer<typeof productSchema>["category"];
};
// TODO: Create Product Category filter in home
export const ProductCategory = forwardRef<
  HTMLButtonElement,
  ProductCategoryType
>((props, ref) => {
  const productCategoryId = "product-category"
  
  return (
    <section className="flex w-full justify-between p-1">
      <label htmlFor={productCategoryId}>Category:</label>
      <button ref={ref} className={cartButtonClasses}>
        <p className={cartParagraphClasses} id={productCategoryId}>
          {props.category}
        
      </button>
    </section>
  );
});

export default ProductDetails;
