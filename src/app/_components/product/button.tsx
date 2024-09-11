"use client";

import { useRouter } from "next/navigation";

import Button, { type ButtonType } from "@/app/_components/button";
import Paragraph from "@/app/_components/paragraph";
import ProductImage from "@/app/_components/product/image";
import type { ProductType } from "@/types/product.schema";
import type { PagesType } from "@/utils/pages";
import { emptyProductImage } from "@/utils/product";

type ProductButtonType = Omit<ButtonType, "children"> & ProductType;

const ProductButton = (props: ProductButtonType) => {
  const { id, name, description, images } = props;
  const descriptionMaxLength = 30;
  const route: PagesType = "/products";
  const router = useRouter();

  return (
    <Button onClick={() => router.push(`${route}/${id}`)}>
      <ProductImage image={images[0] ?? emptyProductImage} dimension={64} />
      <Paragraph
        text={name}
        color="black"
        activeColor="paper"
        hoverColor="paper"
      />
      <Paragraph
        text={
          description.length > descriptionMaxLength
            ? `${description.substring(0, descriptionMaxLength)}...`
            : description
        }
        color="black"
        activeColor="paper"
        hoverColor="paper"
      />
    </Button>
  );
};

export default ProductButton;
