import Input, { type InputType } from "@/app/_components/input";
import Select, { type SelectType } from "@/app/_components/select";
import type { ProductType } from "@/types/product.schema";

type ProductPriceType = { price: ProductType["price"]; disabled?: boolean } & {
  input?: Omit<InputType, "label">;
} & {
  select?: Omit<
    SelectType<ProductType["price"]["currency"]>,
    "options" | "label"
  >;
};

const ProductPrice = (props: ProductPriceType) => {
  const { price, disabled } = props;
  const { value, currency } = price;
  const currencyOptions = ["PHP", "USD"];
  const productPriceId = "product-price";
  const productCurrencyId = "product-currency";

  return (
    <section className="grid w-full grid-flow-row justify-between gap-2 sm:grid-flow-col sm:justify-center">
      <Input
        id={productPriceId}
        label="Price"
        placeholder="price"
        type="number"
        value={value}
        disabled={disabled}
        {...props.input}
      />
      <Select
        label="Currency"
        id={productCurrencyId}
        value={currency}
        options={currencyOptions.map((value) => ({
          label: value,
          value,
        }))}
        disabled={disabled}
        {...props.select}
      />
    </section>
  );
};

export default ProductPrice;
