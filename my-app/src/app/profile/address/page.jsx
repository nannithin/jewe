"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddressPage() {
  const [address, setAddress] = useState({
    name: "",
    pincode: "",
    city: "",
    state: "",
    area: "",
    flat: "",
    country: "",
  });

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <h1 className="text-3xl font-semibold mb-8">Saved Address</h1>

      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">

        {Object.keys(address).map((key) => (
          <Input
            key={key}
            placeholder={key.toUpperCase()}
            value={address[key]}
            onChange={(e) =>
              setAddress({ ...address, [key]: e.target.value })
            }
          />
        ))}

        <Button className="w-full bg-black text-white mt-4">
          Save Address
        </Button>
      </div>
    </div>
  );
}
