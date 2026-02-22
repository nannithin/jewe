import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import necklace from "../../public/necklace.jpg";
import useStore from "@/store/useStore";

const ItemCard = ({ product }) => {
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
        <Link href={`/item/${product.slug}`}>

            <div>
                <div className="relative z-10 h-32 w-32 md:h-40 md:w-40 bg-[#F6F6F6]">
                    <Image
                        className="object-fill"
                        src={product?.image}
                        alt={product.title}
                        fill
                    />
                    <Heart onClick={(e) => {
                        e.preventDefault();      // stops Link navigation
                        e.stopPropagation();     // stops bubbling
                        handleWishlist();
                    }} size={18} className={`absolute top-3 right-3 font-normal ${isWishlisted && "fill-[#B5947C] text-[#B5947C]"}`} />
                </div>

                <div className="w-32 md:w-40 flex flex-col items-center">
                    <p className="text-sm text-muted-foreground uppercase">
                        {product.category}
                    </p>

                    <p className="line-clamp-1">{product.title}</p>

                    <p>₹{product.price}</p>
                </div>
            </div>
        </Link>
    );
};

export default ItemCard;
