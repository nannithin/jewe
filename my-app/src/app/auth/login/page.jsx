"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function () {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    const res = await api.post("/auth/login", {
      email: user.email,
      password: user.password,
    });

    const { token, user: loggedUser } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(loggedUser));

    router.push("/")
  } catch (error) {
    alert(error.response?.data?.message || "Invalid credentials");
  }
  };

  return (
    <div className="w-full md:max-w-md md:mx-auto p-12 px-5">
      <h1 className="text-3xl font-normal text-center">Login</h1>

      <form
        action=""
        method="post"
        className="space-y-3"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-1">
          <label htmlFor="email">
            Email <span className="text-orange-600"> *</span>
          </label>
          <Input
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="password">
            Password <span className="text-orange-600"> *</span>
          </label>
          <Input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <p className="text-right text-sm">Forgot password?</p>
        </div>

        <Button className="w-full h-11 my-1 bg-[#B5947C] border-none text-white">
          Login
        </Button>

        <p className="my-3">
          Don't have an account ?{" "}
          <Link href={"/auth/signup"}><span className="text-[#B5947C] font-medium cursor-pointer">Signup</span></Link>
        </p>
      </form>
    </div>
  );
}
