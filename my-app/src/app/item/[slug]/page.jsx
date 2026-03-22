"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useStore from "@/store/useStore";
import { ChevronRight, Heart, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { showToast } from "nextjs-toast-notify";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function Item({ params }) {
  const [showAdditional, setShowAdditional] = useState(false);
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [descr, setDescr] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null)

  const { wishlist, addToWishlist, removeFromWishlist, addToCart, increaseQty, decreaseQty } = useStore();
  // Next.js 15 (client component)
  const { slug } = React.use(params);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect(); // initial

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (index) => {
    emblaApi && emblaApi.scrollTo(index);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${slug}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (!product?._id) return;

    const fetchRelated = async () => {
      try {
        const res = await api.get(`/products/related/${product._id}`);
        setRelated(res.data.products);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRelated();
  }, [product]);

  const isWishlisted = wishlist.some((item) => item._id === product?._id);

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };


  if (!product) return <p className="p-5">Loading...</p>;
  console.log(product);


  return (
    <div className="w-full pb-32 px-5 space-y-5">
      <div className="flex items-center gap-1 list-none text-[15px] pt-3">
        <li className="text-muted-foreground">Home</li>
        <ChevronRight size={16} />
        <li>Shop</li>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,620px)_1fr] lg:items-start">
        <div className="space-y-4 lg:sticky lg:top-24">

          {/* 🔥 Carousel */}
          <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl lg:max-w-[620px]" ref={emblaRef}>
            <div className="flex">
              {product?.images.map((img, index) => (
                <div key={index} className="min-w-full">
                  <div className="aspect-square w-full overflow-hidden bg-accent">
                    <Image
                      src={img}
                      alt="product"
                      width={800}
                      height={800}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🔥 Dots Indicator */}
          <div className="flex justify-center gap-2">
            {product?.images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-all ${selectedIndex === index
                  ? "bg-[#B5947C] w-4"
                  : "bg-gray-300"
                  }`}
              />
            ))}
          </div>

          {/* 🔥 Thumbnails */}
          <div className="flex gap-2 overflow-x-auto">
            {product?.images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => scrollTo(index)}
                className={`h-16 w-16 shrink-0 rounded object-cover cursor-pointer border transition md:h-20 md:w-20 ${selectedIndex === index ? "border-[#B5947C]" : "border-gray-200"
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="tracking-wide text-xl">{product.title}</h1>
          <div className="flex items-center gap-3">
            <h2 className="font-medium text-xl text-[#B5947C]">
              ₹{product.price}
            </h2>

            {product.originalPrice > product.price && (
              <>
                <p className="text-gray-400 line-through">
                  ₹{product.originalPrice}
                </p>

                <p className="text-green-600 text-sm font-medium">
                  {product.discountPercentage}% OFF
                </p>
              </>
            )}
          </div>

          <p className="text-muted-foreground text-sm py-2">
            {product.description}
          </p>

          <div className="text-sm flex items-center gap-3">
            <p>Availability:</p>
            <p className={product.inStock ? "text-green-700" : "text-red-600"}>
              {product.inStock ? "In stock" : "Out of stock"}
            </p>
          </div>

          <div className="space-y-3 lg:max-w-md">
            <div className="flex justify-between items-center">
              <p className="text-[17px]">Size</p>
              <p className="text-xs text-[#B5947C]">SIZE GUIDE</p>
            </div>

            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4">
              {product.sizes.map((size) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(size.label)}
                  disabled={!size.available}
                  className={`
          min-h-11 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all duration-200
          ${selectedSize === size.label
                      ? "bg-[#B5947C] text-white"
                      : "border-gray-200 bg-gray-100 text-gray-900 hover:border-gray-300 hover:bg-gray-50"
                    }
          ${!size.available
                      ? "cursor-not-allowed opacity-40 line-through"
                      : "cursor-pointer"
                    }
        `}
                >
                  {size.label}
                </button>
              ))}
            </div>

            {selectedSize && (
              <p className="pt-1 text-sm text-gray-600">
                Selected size:{" "}
                <span className="font-medium text-gray-900">{selectedSize}</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-5">
            <div className="w-fit flex items-center justify-center gap-3 border p-1.5">
              <Minus
                size={17}
                className="cursor-pointer"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              />
              {quantity}
              <Plus
                size={17}
                className="cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
              />
            </div>
            <Button onClick={() => {
              if (selectedSize) {
                addToCart(product, quantity, selectedSize)
                removeFromWishlist(product._id);
                showToast.success("Item added to cart", {
                  duration: 4000,
                  progress: true,
                  position: "top-right",
                  transition: "popUp",
                  icon: '',
                  sound: true,
                });
              } else {
                showToast.error("Select size", {
                  duration: 4000,
                  progress: true,
                  position: "top-right",
                  transition: "popUp",
                  icon: '',
                  sound: true,
                });
              }

            }} className={"bg-[#B5947C] border-none text-white"}>
              ADD TO CART
            </Button>
          </div>

          <p onClick={handleWishlist} className="flex items-center gap-2 text-sm py-2">
            <Heart className={`${isWishlisted && "fill-[#B5947C] text-[#B5947C]"}`} size={16} /> {isWishlisted ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
          </p>

          {/* Description header (unchanged) */}
          <div className="py-3 border-b flex justify-between items-center cursor-pointer" onClick={() => setDescr(!descr)}>
            <p>Description</p>
            <Plus size={17} />
          </div>
          {descr && (
            <p className="text-sm text-muted-foreground py-2">
              {product.description}
            </p>
          )}

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
      {related.length > 0 && (
        <div className="pt-10 space-y-5">

          <h2 className="text-lg font-semibold">
            You may also like
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {related.map((item) => (
              <div
                key={item._id}
                onClick={() => router.push(`/item/${item.slug}`)}
                className="group flex flex-col overflow-hidden  bg-white transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={item.images?.[0] || "/placeholder.png"}
                    alt={item?.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Discount badge */}
                  {item.originalPrice > item.price && (
                    <span className="absolute top-0 left-0 bg-[#B5947C] text-white text-xs px-2.5 py-1 shadow-sm">
                      {Math.round(
                        ((item.originalPrice - item.price) / item.originalPrice) * 100
                      )}
                      % OFF
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between gap-2 mt-2 flex-1">
                  {/* Title */}
                  <h3 className="font-medium text-[17px] text-gray-500 line-clamp-2 leading-snug">
                    {item?.title}
                  </h3>

                  {/* Price + Button */}
                  <div className="flex flex-col gap-2 justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-semibold text-[#B5947C]">
                        ₹{item.price}
                      </span>

                      {item.originalPrice > item.price && (
                        <span className="text-base font-medium text-gray-400 line-through">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>

                    <Button

                      className={"w-full text-[17px]"}
                    >
                      BUY NOW
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
