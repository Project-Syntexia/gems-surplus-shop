import {
  inputClasses,
  selectClasses,
  type CustomInputType,
  type CustomSelectType,
} from ".";
import { fieldContainerClasses } from "@/app/_components/cart";
import type { ProductType } from "@/types/product.schema";

type ProductPriceType = { price: ProductType["price"] } & {
  input: CustomInputType;
} & {
  select: CustomSelectType;
};

const ProductPrice = (props: ProductPriceType) => {
  const { value, currency } = props.price;
  const productPriceId = "product-price";
  const productCurrencyId = "product-currency";

  return (
    <section className="grid grid-flow-col gap-2">
      <div className={fieldContainerClasses}>
        <label htmlFor={productPriceId}>Price</label>
        <input
          id={productPriceId}
          className={inputClasses}
          placeholder="price"
          type="number"
          value={value}
          {...props.input}
          readOnly={props.input.disabled}
        />
      </div>
      <div className={fieldContainerClasses}>
        <label htmlFor={productCurrencyId}>Currency</label>
        <select
          id={productCurrencyId}
          value={currency}
          className={selectClasses}
          {...props.select}
        >
          <option>PHP</option>
          <option>USD</option>
        </select>
      </div>
    </section>
  );
};

export default ProductPrice;
