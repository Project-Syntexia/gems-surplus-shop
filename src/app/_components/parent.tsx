import React from "react";
import type { ChildrenType } from "@/app/layout";

type ParentType = {
  className: string;
} & ChildrenType;

/**
 * This component is intended for returning
 *
 * a `div` component that uses style depending
 *
 * on the component's context.
 *
 * @returns `<div className>{children}</div>`
 */
const Parent = (props: ParentType) => {
  const { className, children } = props;
  return <div className={className}>{children}</div>;
};

export default Parent;
