"use client";

import Image from "next/image";
import { useState } from "react";
import CartModal from "./CartModal";
import { useCartStore } from "@/hooks/useCartStore";

const NavIcons = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCartStore();

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {/* Cart Icon */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="Cart Icon" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          {items.length || 0}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
