import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import necklace from "../../public/necklace.jpg";
import useStore from "@/store/useStore";

const ItemCard = ({ product : item }) => {
    const { wishlist, addToWishlist, removeFromWishlist } = useStore();
    console.log(wishlist);


    const isWishlisted = wishlist.some((item) => item._id === product._id);

    const handleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };
    return (
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
                <Heart onClick={(e) => {
                        e.preventDefault();      // stops Link navigation
                        e.stopPropagation();     // stops bubbling
                        handleWishlist();
                    }} size={18} className={`absolute top-3 right-3 font-normal ${isWishlisted && "fill-[#B5947C] text-[#B5947C]"}`} />
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
    );
};

export default ItemCard;
