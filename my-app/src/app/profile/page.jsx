import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";

export default function(){
    return(
        <div className="w-full p-12 px-5 space-y-5">
            <div className="flex items-center gap-5">
                <div className="w-28 h-28 rounded-full bg-accent"></div>
                <div className="space-y-1">
                    <h1 className="font-medium">Nithin</h1>
                    <p>nithinyalakala@gmail.com</p>
                </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
                <p>Orders</p>
                <ChevronRight/>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
                <p>Customer care</p>
                <ChevronRight/>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
                <p>Address</p>
                <ChevronRight/>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
                <p>Terms & Conditions</p>
                <ChevronRight/>
            </div>
            <Button className={"h-11 w-full my-3"}>Logout</Button>
        </div>
    )
}