"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Heart, Minus, Plus } from "lucide-react";
import React, { useState } from "react";

export default function Item({ params }) {
  const [showAdditional, setShowAdditional] = useState(false);

  // Next.js 15 (client component)
  const { slug } = React.use(params);

  const [product, setProduct] = useState(null);

  useState(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `hhttps://jewe-2w4e.onrender.com/api/products/${slug}`
      );
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, []);

  if (!product) return <p className="p-5">Loading...</p>;

  return (
    <div className="w-full pb-32 px-5 space-y-5">
      <div className="flex items-center gap-1 list-none text-[15px] pt-3">
        <li className="text-muted-foreground">Home</li>
        <ChevronRight size={16} />
        <li>Shop</li>
      </div>

      <div className="space-y-5">
        <div className="w-full aspect-square bg-accent"></div>

        <div className="space-y-3">
          <h1 className="tracking-wide text-xl">{product.title}</h1>
          <h2 className="font-medium text-xl">₹{product.price}</h2>

          <p className="text-muted-foreground text-sm py-2">
            {product.description}
          </p>

          <div className="text-sm flex items-center gap-3">
            <p>Availability:</p>
            <p className={product.inStock ? "text-green-700" : "text-red-600"}>
              {product.inStock ? "In stock" : "Out of stock"}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-[17px]">Size</p>
              <p className="text-xs text-[#B5947C]">SIZE GUIDE</p>
            </div>
            <Input type="text" />
          </div>

          <div className="flex items-center gap-5">
            <div className="w-fit flex items-center justify-center gap-3 border p-1.5">
              <Minus size={17} /> 1 <Plus size={17} />
            </div>
            <Button className={"bg-[#B5947C] border-none text-white"}>
              ADD TO CART
            </Button>
          </div>

          <p className="flex items-center gap-2 text-sm py-2">
            <Heart size={16} /> ADD TO WISHLIST
          </p>

          {/* Description header (unchanged) */}
          <div className="py-3 border-b flex justify-between items-center">
            <p>Description</p>
            <Plus size={17} />
          </div>

          {/* Additional Info header (CLICKABLE) */}
          <div
            className="py-3 border-b flex justify-between items-center cursor-pointer"
            onClick={() => setShowAdditional(!showAdditional)}
          >
            <p>Additional Information</p>
            <Plus size={17} />
          </div>

          {/* Additional Info content (shown only on click) */}
          {showAdditional && (
            <p className="text-sm text-muted-foreground py-2">
              {product.additionalInfo}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
