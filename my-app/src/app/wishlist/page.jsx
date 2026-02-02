import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";

export default function Wishlist() {
    return (
        <div className="w-full pb-32 px-5 space-y-5">
            <div className="flex items-center gap-1 list-none text-[15px] pt-3">
                <li className="text-muted-foreground">Home</li>
                <ChevronRight size={16} />
                <li>Wishlist</li>
            </div>
            <h1 className="font-normal text-4xl text-center">Wishlist</h1>
            <div>
                <div className="py-5 border-b flex justify-between items-start gap-5 ">
                    <div className="w-24 h-24 aspect-square bg-accent"></div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <h1 className="text-sm font-medium">Circle of Light Heart Earrings</h1>
                            <X/>
                        </div>
                        <p className="text-sm">Price: $500</p>
                        <a href="" className="font-medium text-sm">Add to cart</a>
                    </div>
                </div>
                <div className="py-5 border-b flex justify-between items-start gap-5 ">
                    <div className="w-24 h-24 aspect-square bg-accent"></div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <h1 className="text-sm font-medium">Circle of Light Heart Earrings</h1>
                            <X/>
                        </div>
                        <p className="text-sm">Price: $500</p>
                        <a href="" className="font-medium text-sm">Add to cart</a>
                    </div>
                </div>
                <div className="py-5 border-b flex justify-between items-start gap-5 ">
                    <div className="w-24 h-24 aspect-square bg-accent"></div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <h1 className="text-sm font-medium">Circle of Light Heart Earrings</h1>
                            <X/>
                        </div>
                        <p className="text-sm">Price: $500</p>
                        <a href="" className="font-medium text-sm">Add to cart</a>
                    </div>
                </div>
                <div className="py-5 border-b flex justify-between items-start gap-5 ">
                    <div className="w-24 h-24 aspect-square bg-accent"></div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <h1 className="text-sm font-medium">Circle of Light Heart Earrings</h1>
                            <X/>
                        </div>
                        <p className="text-sm">Price: $500</p>
                        <a href="" className="font-medium text-sm">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>
    )
}