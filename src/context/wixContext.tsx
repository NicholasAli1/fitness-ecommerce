"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart, orders } from "@wix/ecom";
import { members } from "@wix/members";
import { redirects } from "@wix/redirects";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

const getStoredToken = () => {
  try {
    const token = Cookies.get("refreshToken");
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error("Token parse error:", error);
    return null;
  }
};

const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    orders,
    members,
    redirects,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: {
      refreshToken: getStoredToken(),
      accessToken: { value: "", expiresAt: 0 },
    },
  }),
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
