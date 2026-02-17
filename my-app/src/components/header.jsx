'use client'

import { Heart, Home, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const Header = () => {
    const [openSearch, setOpenSearch] = useState(false);
    const router = useRouter();
    const [query, setQuery] = useState("")
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const inputRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                // scrolling down
                setShowHeader(false);
            } else {
                // scrolling up
                setShowHeader(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // lock background scroll
    useEffect(() => {
        document.body.style.overflow = openSearch ? "hidden" : "auto";
    }, [openSearch]);
    const [cate, setCate] = useState([
        "Necklaces",
        "Rings",
        "Bracelets",
        "Earnings",
        "watches"
    ])
    const [open, setOpen] = useState(false);
    return (
        <div className={`w-full `}>
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-50"
                    onClick={() => setOpen(false)}
                />
            )}
            <div className={`
    fixed top-0 left-0 w-full bg-white z-50
    transition-transform duration-300 ease-in-out
    ${showHeader ? "translate-y-0" : "-translate-y-full"}
  `}>
                <div className="relative z-10 md:h-20 h-16 flex items-center justify-between md:px-20 px-5 border-b border-[#E5E5E5]">
                    <div className="relative max-md:hidden">
                        <Input
                            autoFocus
                            placeholder="Search products..."
                            className="w-[270px]"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && query.trim()) {
                                    setOpenSearch(false);
                                    router.push(`/item?search=${query}`);
                                }
                            }}
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B3B3B3]" />
                    </div>
                    <Menu className="md:hidden" onClick={() => setOpen(prev => !prev)} />
                    <h1 className="md:absolute md:left-1/2 md:-translate-x-1/2 text-[20px] uppercase text-[#222222]">Nithin & CO</h1>
                    <div className="flex items-center gap-3">
                        <Link href={"/profile"}><User className="max-md:hidden" /></Link>
                        <Link href={"/wishlist"}><Heart className="max-md:hidden" /></Link>
                        <Link href={"/cart"}><ShoppingCart /></Link>
                    </div>
                </div>
                <div className="h-12 max-md:hidden flex items-center justify-between px-20 border-b border-[#E5E5E5] text-[13px]">
                    <h2>BROWSE COLLECTIONS</h2>
                    <div>
                        <ul className="list-none flex items-center gap-4">
                            <Link href="/#home" className="cursor-pointer">HOME</Link>
                            <Link href="/#collections" className="cursor-pointer">COLLECTIONS</Link>
                            <Link href="/#trending" className="cursor-pointer">TRENDING</Link>
                            <Link href="/#about" className="cursor-pointer">ABOUT</Link>
                            <Link href="/#reviews" className="cursor-pointer">REVIEWS</Link>
                            <Link href="/profile" className="cursor-pointer">MY ACCOUNT</Link>

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
                        <p className="text-muted-foreground border-b-2 border-black py-4 ">CATEGORIES</p>
                    </div>
                    <div className="px-5 list-none py-3">
                        {
                            cate.map((item, ind) => (
                                <li onClick={() => {
                                    setOpen(false)
                                    router.push(`/item?search=${item}`)
                                }} className="py-2" key={ind}>{item}</li>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* BOTTOM NAV */}
            <div className="md:hidden fixed z-30 bottom-0 h-18 w-full bg-white border-t flex items-center justify-between px-5">
                <Link href={"/"} onClick={() => setOpenSearch(false)} className="flex flex-col items-center gap-1 list-none">
                    <Home size={20} />
                    <span className="text-[13px]">Home</span>
                </Link>

                <div onClick={() => setOpenSearch(true)} className="flex flex-col items-center gap-1 list-none"><Search size={20} />
                    <li className="text-[13px]">Search</li></div>
                <Link href={"/wishlist"} onClick={() => setOpenSearch(false)} className="flex flex-col items-center gap-1 list-none">
                    <Heart size={20} />
                    <span className="text-[13px]">Wishlist</span></Link>
                <div
                    onClick={async () => {
                        try {
                            const res = await api.get("/products/dashboard");

                            if (res.status === 200) {
                                setOpenSearch(false)
                                router.push("/profile");
                            } else if (res.status === 401) {
                                setOpenSearch(false)
                                router.push("/auth/login");
                            }
                        } catch (error) {
                            setOpenSearch(false)
                            router.push("/auth/login");
                        }
                    }}
                    className="flex flex-col items-center gap-1 list-none cursor-pointer"
                >
                    <User size={20} />
                    <span className="text-[13px]">Account</span>
                </div>

            </div>
            <div
                className={`fixed  px-5 py-8 space-y-5 inset-0 z-20 bg-white
        transform transition-transform duration-500 ease-in-out
        ${openSearch ? "translate-y-0" : "-translate-y-full"}`}
            >
                <X
                    className="cursor-pointer float-right"
                    onClick={() => setOpenSearch(false)}
                />
                <Input
                    ref={inputRef}
                    autoFocus
                    placeholder="Search products..."
                    className="flex-1"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && query.trim()) {
                            setQuery("")
                            inputRef.current?.blur();
                            setOpenSearch(false);
                            router.push(`/item?search=${query}`);
                        }
                    }}
                />



            </div>
        </div>
    )
}

export default Header;