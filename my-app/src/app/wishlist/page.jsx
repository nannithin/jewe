"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";
import useStore from "@/store/useStore";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="w-full pb-32 px-5 pt-20 text-center">
        <h1 className="text-2xl font-medium">Your wishlist is empty 💔</h1>
      </div>
    );
  }

  return (
    <div className="w-full pb-32 px-5 space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[15px] pt-3">
        <span className="text-muted-foreground">Home</span>
        <ChevronRight size={16} />
        <span>Wishlist</span>
      </div>

      <h1 className="font-normal text-4xl text-center">Wishlist</h1>

      <div>
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="py-5 border-b flex gap-5"
          >
            <div className="w-24 h-24 aspect-square bg-accent rounded-md" />

            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-start">
                <h1 className="text-sm font-medium">{item.title}</h1>
                <X
                  className="cursor-pointer"
                  onClick={() => removeFromWishlist(item._id)}
                />
              </div>

              <p className="text-sm">Price: ${item.price}</p>

              <Button
                variant="link"
                className="p-0 h-auto text-sm"
                onClick={() => {
                  addToCart(item);
                  removeFromWishlist(item._id);
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
