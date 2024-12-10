"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useState } from "react";

const Add = ({ product }: { product: any }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price.price,
      quantity: quantity,
      image: product.media?.mainMedia?.image?.url
    });
    alert('Added to cart!');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <button
          onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
          className="w-10 h-10 ring-1 ring-lama rounded-md"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="w-10 h-10 ring-1 ring-lama rounded-md"
        >
          +
        </button>
      </div>
      <button
        className="bg-lama text-white p-4 rounded-md"
        onClick={handleAdd}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Add;
