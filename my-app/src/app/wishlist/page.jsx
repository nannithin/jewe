"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";
import useStore from "@/store/useStore";
import Link from "next/link";
import { showToast } from "nextjs-toast-notify";
import Image from "next/image";

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
          <Link href={`/item/${item.slug}`}
            key={item._id}
            className="py-5 border-b flex gap-5"

          >
            <div className="w-24 h-24 aspect-square bg-accent rounded-md">
              <Image src={item?.image} alt="item" className="w-full aspect-square"/>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-start">
                <h1 className="text-sm font-medium">{item.title}</h1>
                <X
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeFromWishlist(item._id)

                  }}
                />
              </div>

              <p className="text-sm">Price: ${item.price}</p>

              <Button
                variant="link"
                className="p-0 h-auto text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addToCart(item);
                  removeFromWishlist(item._id);
                  showToast.success("Item added to cart", {
                    duration: 4000,
                    progress: true,
                    position: "top-right",
                    transition: "popUp",
                    icon: '',
                    sound: true,
                  });
                }}
              >
                Add to cart
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
