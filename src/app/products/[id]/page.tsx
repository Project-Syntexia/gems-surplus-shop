import type {
  Metadata,
  // ResolvingMetadata
} from "next";

import Main from "@/app/_components/main";
import { productDetailsContainerClasses } from "@/app/_components/product";
import ProductProvider from "@/app/contexts/productContext";
import { SHOP_NAME } from "@/utils/const";
import { api } from "@/trpc/server";
import type { ProductType } from "@/types/product.schema";
import ProductDetails from "@/app/_components/product/details";

type MetadataParamsType = {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
};

async function getProductDetails(id: string) {
  try {
    const products = (await api.product.fetchProductById({
      id,
    })) as ProductType;
    return products;
  } catch (err) {
    // throw new Error("error");
    return null;
  }
}

export async function generateMetadata(
  { params }: MetadataParamsType,
  // parent: ResolvingMetadata,
): Promise<Metadata> {
  const result = await getProductDetails(params.id);
  if (result === null) {
    return {
      title: `${SHOP_NAME} | 404 Not Found`,
    };
  }

  return {
    title: `${SHOP_NAME} | ${result.name}`,
    description: result.description,
  };
}

const Page = async ({ params }: MetadataParamsType) => {
  try {
    const productDetails = await getProductDetails(params.id);

    if (productDetails === null)
      throw new Error(`Result is null, Product ID: ${params.id} not found!`);

    return (
      <Main>
        <ProductProvider>
          <div className={productDetailsContainerClasses}>
            <ProductDetails {...productDetails} isDisabled />
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
