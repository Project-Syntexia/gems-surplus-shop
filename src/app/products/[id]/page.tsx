import type {
  Metadata,
  // ResolvingMetadata
} from "next";

import Main from "@/app/_components/main";
import Paragraph from "@/app/_components/paragraph";
import Parent from "@/app/_components/parent";
import ProductDetails from "@/app/_components/product/details";
import { api } from "@/trpc/server";
import type { ProductType } from "@/types/product.schema";
import { SHOP_NAME } from "@/utils/const";

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
  const productDetailsContainerClasses =
    "mx-auto w-full flex sm:w-3/4 flex-col items-center justify-center rounded-lg border p-2 shadow-sm";
  try {
    const productDetails = await getProductDetails(params.id);

    if (productDetails === null)
      throw new Error(`Result is null, Product ID: ${params.id} not found!`);

    return (
      <Main isOverlapping>
        <Paragraph text="Edit product" style="bold" />
        <Parent className={productDetailsContainerClasses}>
          <ProductDetails {...productDetails} isDisabled />
        </Parent>
      </Main>
    );
  } catch (err) {
    return (
      <Main>
        <Parent>
          <p>404 Not Found</p>
        </Parent>
      </Main>
    );
  }
};

export default Page;
