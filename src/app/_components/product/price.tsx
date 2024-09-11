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
    <section className="grid grid-flow-col gap-2">
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
