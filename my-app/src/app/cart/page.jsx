import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight, Minus, Plus, X } from "lucide-react";

export default function Cart() {
    return (
        <div className="w-full pb-32 px-5 space-y-5">
            <div className="flex items-center gap-1 list-none text-[15px] pt-3">
                <li className="text-muted-foreground">Home</li>
                <ChevronRight size={16} />
                <li>Cart</li>
            </div>
            <h1 className="font-normal text-4xl text-center">Cart</h1>
            <div>
                
                <div className="py-5 border-b flex justify-between items-start gap-5 ">
                    <div className="w-24 h-24 aspect-square bg-accent"></div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <h1 className="text-sm font-medium">Circle of Light Heart Earrings</h1>
                            <X/>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <p>Price:</p>
                            <p className="text-[16px] font-medium">$500</p>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <p>Quantity: </p>
                            <div className="w-fit flex items-center justify-center gap-3 border p-1.5"><Minus size={17}/> 1 <Plus size={17}/></div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <p>Subtotal:</p>
                            <p className="text-[16px] font-medium">$500</p>
                        </div>
                    </div>
                </div>
                
                
            </div>
            <div className="flex flex-col gap-3">
                <Input type="text" placeholder="Coupon code" />
                <Button>APPLY</Button>
            </div>
            <div className="w-full border border-black p-5">
                <h1 className="font-medium text-xl pb-8">Cart total</h1>
                <div className="space-y-5"> 
                    <div className="pb-4 font-medium border-b flex justify-between items-center">
                        <p>Subtotal</p>
                        <p>$318</p>
                    </div>
                    <div className="flex items-start justify-between text-sm border-b pb-4">
                        <p className="font-medium">Shipping</p>
                        <div className="space-y-3">
                            <p className="text-muted-foreground">Shipping to <span className="text-black font-medium">LPU</span></p>
                            <p className="font-medium flex items-center gap-1">Change address <ChevronDown size={17} /></p>
                        </div>
                    </div>
                    <div className="pb-4 font-medium border-b flex justify-between items-center">
                        <p>Total</p>
                        <p>$318</p>
                    </div>
                </div>
            </div>
        </div>
    )
}