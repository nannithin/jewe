import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Heart, Minus, Plus, X } from "lucide-react";

export default function Item() {
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
                    <h1 className="tracking-wide text-xl">Color by the Yard Emerald Pendant</h1>
                    <h2 className="font-medium text-xl">$583</h2>
                    <p className="text-muted-foreground text-sm py-2">Style this adjustable chain with other pendants of varying lengths for a look that’s sure to turn heads.</p>
                    <div className="text-sm flex items-center gap-3">
                        <p>Availability: </p>
                        <p className="text-green-700">In stock</p>
                    </div>
                    <div className="space-y-3">
                        <div className=" flex justify-between items-center">
                            <p className="text-[17px]">Size</p>
                            <p className="text-xs text-[#B5947C]">SIZE GUIDE</p>
                        </div>
                        <Input type={"text"} />
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="w-fit flex items-center justify-center gap-3 border p-1.5"><Minus size={17} /> 1 <Plus size={17} /></div>
                        <Button className={"bg-[#B5947C] border-none text-white"}>ADD TO CART</Button>
                    </div>
                    <p className="flex items-center gap-2 text-sm py-2"><Heart size={16}/> ADD TO WISHLIST</p>
                    <div className="py-3 border-b flex justify-between items-center">
                        <p>Description</p>
                        <Plus size={17}/>
                    </div>
                    <div className="py-3 border-b flex justify-between items-center">
                        <p>Additional Information</p>
                        <Plus size={17}/>
                    </div>
                </div>
            </div>
        </div>
    )
}