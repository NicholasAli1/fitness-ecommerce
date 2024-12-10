"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";

const CartModal = () => {
  const { items, removeItem, clearCart, getTotal } = useCartStore();

  const handleCheckout = () => {
    alert(`Order total: $${getTotal().toFixed(2)}\nThis is a demo checkout!`);
    clearCart();
  };

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!items.length ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {items.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p className="text-sm">${item.price}</p>
                  <button
                    className="text-red-500"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold">Total: ${getTotal().toFixed(2)}</span>
            <button
              className="bg-lama text-white p-2 rounded-md"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
