import { Heart } from "lucide-react";
import necklace from "../../public/necklace.jpg"
import Image from "next/image";

const ItemCard = () => {
    return (
        <div>
            <div className="relative z-10 h-32 w-32 md:h-40 md:w-40 bg-[#F6F6F6]">
                <Image className="object-fill" src={necklace} alt="necklace" /> 
                <Heart size={18} className="absolute top-3 right-3 font-normal "/>
            </div>
            <div className="w-32 md:w-40 flex flex-col items-center">
                <p className="text-sm text-muted-foreground">NECKLACES</p>
                <p className="line-clamp-1">Birds of  Paradise Pendent</p>
                <p>₹70,299</p>
            </div>
        </div>
    )
}

export default ItemCard;