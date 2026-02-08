import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import necklace from "../../public/necklace.jpg";

const ItemCard = ({ product }) => {
    return (
        <Link href={`/item/${product.slug}`}>

            <div>
                <div className="relative z-10 h-32 w-32 md:h-40 md:w-40 bg-[#F6F6F6]">
                    <Image
                        className="object-fill"
                        src={product.images?.[0]?.url || necklace}
                        alt={product.title}
                        fill
                    />
                    <Heart size={18} className="absolute top-3 right-3 font-normal" />
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
