"use client";

import type { ChildrenType } from "./layout";
import { useParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type InitialStateType = {
  productId?: string;
};
type ProductContextType = InitialStateType & {};
const initialState: InitialStateType = {};
const ProductContext = createContext<ProductContextType>({
  ...initialState,
});

export default function ProductProvider({ children }: ChildrenType) {
  const [state, setState] = useState(initialState);
  const product = useParams();

  const setProductId = useCallback((productId: string) => {
    setState((prevState) => ({ ...prevState, productId }));
  }, []);

  useEffect(() => {
    if (typeof product.id === "string") {
      return setProductId(product.id);
    }
  }, [setProductId, product.id]);

  const values = { ...state };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
