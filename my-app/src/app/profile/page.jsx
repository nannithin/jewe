"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import useStore from "@/store/useStore";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function () {
    const router = useRouter()
    const { user, logout } = useStore();
    console.log(user);
    const [admin,setAdmin] = useState(false)

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            logout(); // reset Zustand
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };


    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const res = await api.get("/products/dashboard");

    //             if (res.status === 200) {
    //                 router.push("/profile");
    //             } else {
    //                 router.push("/auth/login");
    //             }
    //         } catch (error) {
    //             router.push("/auth/login");
    //         }
    //     };

    //     checkAuth();
    // }, []);
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await api.get("/auth/me");
                console.log(res.data.user);
                
                if (res.data.user.role === "admin") {
                    setAdmin(true)
                }
                if(!res.data.user){
                    router.push('/auth/login')
                }
            } catch (error) {
                
                router.push("/auth/login");
            } 
        };

        checkAdmin();
    }, []);
    console.log(admin);
    

    return (
        <div className="w-full pb-12 pt-7 px-5 space-y-5">
            <div className="flex md:flex-row flex-col items-center gap-5">
                <div className="w-28 h-28 rounded-full bg-accent"></div>
                <div className="space-y-1">
                    <h1 className="font-medium text-center">{user?.name}</h1>
                    <p className="text-center">{user?.email}</p>
                </div>
            </div>
            {
                admin &&
                <>
                    <Link href={"/createproduct"} className="flex items-center justify-between py-3 border-b">
                        <p>Add Product</p>
                        <ChevronRight />
                    </Link>
                    <Link href={"/pendingorders"} className="flex items-center justify-between py-3 border-b">
                        <p>Pending Orders</p>
                        <ChevronRight />
                    </Link>
                    <Link href={"/adminorders"} className="flex items-center justify-between py-3 border-b">
                        <p>Admin Orders</p>
                        <ChevronRight />
                    </Link>
                </>
            }

            <Link href={"/profile/orders"} className="flex items-center justify-between py-3 border-b">
                <p>My Orders</p>
                <ChevronRight />
            </Link>
            <Link href={"/profile/help"} className="flex items-center justify-between py-3 border-b">
                <p>Customer care</p>
                <ChevronRight />
            </Link>
            {/* <div className="flex items-center justify-between py-3 border-b">
                <p>Address</p>
                <ChevronRight />
            </div> */}
            <div className="flex items-center justify-between py-3 border-b">
                <p>Terms & Conditions</p>
                <ChevronRight />
            </div>
            <Button onClick={handleLogout} className={"h-11 w-full my-3"}>Logout</Button>
        </div>
    )
}

