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

const Page = ({ params }: PropsType) => {
  return getProductDetails(params.id)
    .then(async (props) => {
      if (props === null)
        throw new Error(`Result is null, Product ID: ${params.id} not found!`);

      const { name, description, imageSrc, quantity, quality, price } = props;
      return (
        <div className="mx-auto flex w-max flex-col items-center justify-center rounded-lg border p-2 shadow-sm">
          <input id="name" placeholder="name" value={name} disabled />
          <input
            id="description"
            placeholder="description"
            value={description}
            disabled
          />
          <input
            id="imageSrc"
            placeholder="imageSrc"
            value={imageSrc}
            disabled
          />
          <input
            id="quantity"
            placeholder="quantity"
            type="number"
            value={quantity}
            disabled
          />
          <select id="quality" value={quality} disabled>
            <option>USED</option>
            <option>SLIGHTLY_USED</option>
            <option>LIKE_BRAND_NEW</option>
          </select>
          <input
            id="price"
            placeholder="price"
            type="number"
            value={price.value}
            disabled
          />
          <select id="currency" value={price.value} disabled>
            <option>PHP</option>
          </select>
        </div>
      );
    })
    .catch(() => {
      return (
        <div>
          <p>404 Not Found</p>
        </div>
      );
    });
};

export default Page;
