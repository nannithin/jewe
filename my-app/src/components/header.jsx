'use client'

import { Heart, Home, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className={`w-full `}>
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-50"
                    onClick={() => setOpen(false)}
                />
            )}
            <div className="relative z-10 md:h-20 h-16 flex items-center justify-between md:px-20 px-5 border-b border-[#E5E5E5]">
                <div className="relative max-md:hidden">
                    <Input type={"text"} placeholder={"Search Products"} className={"w-[270px]"} />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B3B3B3]" />
                </div>
                <Menu onClick={() => setOpen(prev => !prev)} />
                <h1 className="md:absolute md:left-1/2 md:-translate-x-1/2 text-[20px] uppercase text-[#222222]">Nithin & CO</h1>
                <div className="flex items-center gap-3">
                    <User className="max-md:hidden" />
                    <Heart className="max-md:hidden" />
                    <ShoppingCart />
                </div>
            </div>
            <div className="h-12 max-md:hidden flex items-center justify-between px-20 border-b border-[#E5E5E5] text-[13px]">
                <h2>BROWSE COLLECTIONS</h2>
                <div>
                    <ul className="list-none flex items-center gap-4">
                        <li>HOME</li>
                        <li>COLLECTIONS</li>
                        <li>HOME</li>
                        <li>COLLECTIONS</li>
                        <li>HOME</li>
                        <li>COLLECTIONS</li>
                    </ul>
                </div>
                <div>

                </div>
            </div>
            <div className={`md:hidden fixed ${open ? "left-0" : "-left-100"} duration-500 transition-all z-60 top-0 w-4/5 shadow-xl h-screen bg-white`}>
                <div className="h-16 bg-[#F6F6F6] flex justify-between items-center px-5">
                    <h1 className="uppercase text-2xl">Nithin & CO</h1>
                    <X onClick={() => setOpen(prev => !prev)} />
                </div>
                <div className="px-4 border-b flex items-center gap-5 text-[15px] font-medium">
                    <p>MENU</p>
                    <p className="text-muted-foreground border-b-2 border-black py-4 ">CATEGORIES</p>
                </div>
                <div className="px-5 list-none py-3">
                    {
                        [1, 2, 3, 4, 5, 6].map((item, ind) => (
                            <li className="py-2" key={ind}>Home</li>
                        ))
                    }
                </div>
            </div>
            {/* BOTTOM NAV */}
            <div className="md:hidden fixed z-30 bottom-0 h-18 w-full bg-white border-t flex items-center justify-between px-5">
                <div className="flex flex-col items-center gap-1 list-none">
                    <Home size={20}/>
                    <li className="text-[13px]">Home</li>
                </div>
                <div className="flex flex-col items-center gap-1 list-none">
                    <Search size={20}/>
                    <li className="text-[13px]">Search</li>
                </div>
                <div className="flex flex-col items-center gap-1 list-none">
                    <Heart size={20}/>
                    <li className="text-[13px]">Wishlist</li>
                </div>
                <div className="flex flex-col items-center gap-1 list-none">
                    <User size={20}/>
                    <li className="text-[13px]">Account</li>
                </div>
            </div>
        </div>
    )
}

export default Header;