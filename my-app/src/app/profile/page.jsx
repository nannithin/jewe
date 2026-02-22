"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import useStore from "@/store/useStore";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function () {
    const router = useRouter()
    const {user,logout} = useStore();
    const loggedinuser = user?.user;
    useEffect(() => {
    const checkAuth = async () => {
        try {
            const res = await api.get("/products/dashboard");

            if (res.status === 200) {
                router.push("/profile");
            } else {
                router.push("/auth/login");
            }
        } catch (error) {
            router.push("/auth/login");
        }
    };

    checkAuth();
}, []);

    return (
        <div className="w-full p-12 px-5 space-y-5">
            <div className="flex items-center gap-5">
                <div className="w-28 h-28 rounded-full bg-accent"></div>
                <div className="space-y-1">
                    <h1 className="font-medium">{loggedinuser?.name}</h1>
                    <p>{loggedinuser?.email}</p>
                </div>
            </div>
            <Link href={"/profile/orders"} className="flex items-center justify-between py-3 border-b">
                <p>Orders</p>
                <ChevronRight />
            </Link>
            <Link href={"/profile/help"} className="flex items-center justify-between py-3 border-b">
                <p>Customer care</p>
                <ChevronRight />
            </Link>
            <div className="flex items-center justify-between py-3 border-b">
                <p>Address</p>
                <ChevronRight />
            </div>
            <div className="flex items-center justify-between py-3 border-b">
                <p>Terms & Conditions</p>
                <ChevronRight />
            </div>
            <Button className={"h-11 w-full my-3"}>Logout</Button>
        </div>
    )
}

