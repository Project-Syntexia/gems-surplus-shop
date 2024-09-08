import { SHOP_NAME } from "@/utils/const";
import React from "react";

const Footer = () => {
  return (
    <footer className="fixed inset-x-0 bottom-0 flex items-center justify-center text-black">
      {SHOP_NAME}
    </footer>
  );
};

export default Footer;
