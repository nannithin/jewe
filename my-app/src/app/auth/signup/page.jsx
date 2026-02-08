"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function () {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });
  const router = useRouter();

  // common onchange handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit handler
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (user.password !== user.cpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        name: user.name,
        email: user.email,
        password: user.password,
      });

      console.log(res.data);
      router.push('/')
    } catch (error) {
      console.error(error.response?.data?.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full p-12 px-5">
      <h1 className="text-3xl font-normal text-center">Register</h1>

      <form
        action=""
        method="post"
        className="space-y-3"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-1">
          <label htmlFor="name">
            Username <span className="text-orange-600"> *</span>
          </label>
          <Input
            name="name"
            value={user.name}
            type="text"
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="email">
            Email <span className="text-orange-600"> *</span>
          </label>
          <Input
            name="email"
            value={user.email}
            type="email"
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="password">
            Password <span className="text-orange-600"> *</span>
          </label>
          <Input
            name="password"
            value={user.password}
            type="password"
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="cpassword">
            Confirm Password <span className="text-orange-600"> *</span>
          </label>
          <Input
            name="cpassword"
            value={user.cpassword}
            type="password"
            onChange={handleChange}
          />
        </div>

        <Button className="w-full h-11 my-1 bg-[#B5947C] border-none text-white">
          Register
        </Button>

        <p className="my-3">
          Already have an account ?{" "}
          <span className="text-[#B5947C] font-medium">Login</span>
        </p>
      </form>
    </div>
  );
}
