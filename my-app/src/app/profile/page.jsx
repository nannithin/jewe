"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useStore from "@/store/useStore";

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useStore();

  // actual user data
  const loggedUser = user?.user;

  useEffect(() => {
    if (!loggedUser) {
      router.push("/auth/login");
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await api.get("/products/dashboard");

        if (res.status !== 200) {
          router.push("/auth/login");
        }
      } catch (error) {
        router.push("/auth/login");
      }
    };

    checkAuth();
  }, [loggedUser, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    router.push("/");
  };

  return (
    <div className="w-full p-12 px-5 space-y-5">
      <div className="flex items-center gap-5">
        <div className="w-28 h-28 rounded-full bg-accent"></div>
        <div className="space-y-1">
          <h1 className="font-medium">{loggedUser?.name}</h1>
          <p>{loggedUser?.email}</p>
        </div>
      </div>

      <Link
        href={"/profile/orders"}
        className="flex items-center justify-between py-3 border-b"
      >
        <p>Orders</p>
        <ChevronRight />
      </Link>

      <Link
        href={"/profile/help"}
        className="flex items-center justify-between py-3 border-b"
      >
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

      <Button
        className={"h-11 w-full my-3"}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}