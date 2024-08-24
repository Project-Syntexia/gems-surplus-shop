import AddToCartButton from "@/app/_components/cart";
import Main from "@/app/_components/main";
import ProductDetails, {
  productDetailsContainerClasses,
} from "@/app/_components/product";
import ProductProvider from "@/app/contexts";
import { SHOP_NAME } from "@/app/utils/const";
import { api } from "@/trpc/server";
import type {
  Metadata,
  // ResolvingMetadata
} from "next";

type PropsType = {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
};

async function getProductDetails(id: string) {
  try {
    return await api.product.fetchProductById({ id });
  } catch (err) {
    // throw new Error("error");
    return null;
  }
}

export async function generateMetadata(
  { params }: PropsType,
  // parent: ResolvingMetadata,
): Promise<Metadata> {
  const result = await getProductDetails(params.id);
  if (result === null)
    return {
      title: `${SHOP_NAME} | 404 Not Found`,
    };

  return {
    title: `${SHOP_NAME} | ${result.name}`,
    description: result.description,
  };
}

const Page = async ({ params }: PropsType) => {
  try {
    const productDetails = await getProductDetails(params.id);

    if (productDetails === null)
      throw new Error(`Result is null, Product ID: ${params.id} not found!`);

    return (
      <Main>
        <ProductProvider>
          <div className={productDetailsContainerClasses}>
            <ProductDetails {...productDetails} isDisabled />
            <AddToCartButton />
          </div>
        </ProductProvider>
      </Main>
    );
  } catch (err) {
    return (
      <Main>
        <div>
          <p>404 Not Found</p>
        </div>
      </Main>
    );
  }
};

export default Page;
