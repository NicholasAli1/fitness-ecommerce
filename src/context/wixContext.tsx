"use client";

import { createClient } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart, orders } from "@wix/ecom";
import { redirects } from "@wix/redirects";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

const getStoredToken = () => {
  try {
    return JSON.parse(Cookies.get("refreshToken") || "{}");
  } catch {
    return {};
  }
};

const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    orders,
    redirects,
  },
});

export type WixClient = typeof wixClient;

export const WixClientContext = createContext<WixClient>(wixClient);

export const WixClientContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  );
};
