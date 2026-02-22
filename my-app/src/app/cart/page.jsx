"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight, Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import useStore from "@/store/useStore";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cart() {
    const [addOpen, setAddOpen] = useState(false);
    const { cart, removeFromCart, increaseQty, decreaseQty } = useStore();
    const router = useRouter();
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );
    return (
        <div className="w-full pb-32 px-5 space-y-5">
            <div className="flex items-center gap-1 list-none text-[15px] pt-3">
                <li className="text-muted-foreground">Home</li>
                <ChevronRight size={16} />
                <li>Cart</li>
            </div>
            <h1 className="font-normal text-4xl text-center">Cart</h1>
            <div>
                {cart.length === 0 && (
                    <p className="text-center text-muted-foreground pt-10">
                        Your cart is empty 🛒
                    </p>
                )}

                {cart.map((item) => (
                    <Link href={`/item/${item.slug}`}
                        key={item._id}
                        className="py-5 border-b flex justify-between items-start gap-5"
                    >
                        <div className="w-24 h-24 aspect-square bg-accent"><Image className={"w-full h-full aspect-square"} href={item?.image} /></div>

                        <div className="space-y-3 flex-1">
                            <div className="flex justify-between">
                                <h1 className="text-sm font-medium">{item.title}</h1>
                                <X
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        removeFromCart(item._id)

                                    }}
                                />
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <p>Price:</p>
                                <p className="text-[16px] font-medium">₹{item.price}</p>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <p>Quantity:</p>
                                <div className="w-fit flex items-center gap-3 border p-1.5">
                                    <Minus
                                        size={17}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            decreaseQty(item._id)}
                                        }
                                    />
                                    {item.qty}
                                    <Plus
                                        size={17}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            increaseQty(item._id)

                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <p>Subtotal:</p>
                                <p className="text-[16px] font-medium">
                                    ₹{item.price * item.qty}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                <Input type="text" placeholder="Coupon code" />
                <Button className={"h-11"}>Apply coupon</Button>
            </div>
            <div className="w-full border border-black p-5">
                <h1 className="font-medium text-xl pb-8">Cart total</h1>
                <div className="space-y-5">
                    <div className="pb-4 font-medium border-b flex justify-between items-center">
                        <p>Subtotal</p>
                        <p>₹{subtotal}</p>
                    </div>
                    <div className="flex items-start justify-between text-sm border-b pb-4">
                        <p className="font-medium">Shipping</p>
                        <div className="space-y-3">
                            <p className="text-muted-foreground">Shipping to <span className="text-black font-medium">LPU</span></p>
                            <p onClick={() => setAddOpen((prev) => !prev)} className="font-medium flex items-center gap-1">Change address <ChevronDown size={17} /></p>
                        </div>
                    </div>
                    <div
                        className={`
    overflow-hidden transition-all duration-800 ease-in-out
    ${addOpen
                                ? "max-h-150 opacity-100 translate-y-0"
                                : "max-h-0 opacity-0 -translate-y-2"}
    text-sm space-y-3
  `}
                    >

                        <div className="space-y-1 font-medium">
                            <p>Name <span className="text-orange-500">*</span></p>
                            <Input type={"text"} />
                        </div>
                        <div className="space-y-1 font-medium">
                            <p>Pincode <span className="text-orange-500">*</span></p>
                            <Input type={"text"} />
                        </div>
                        <div className="space-y-1 font-medium">
                            <p>City <span className="text-orange-500">*</span></p>
                            <Input type={"text"} />
                        </div>
                        <div className="space-y-1 font-medium">
                            <p>State <span className="text-orange-500">*</span></p>
                            <Input type={"text"} />
                        </div>
                        <div className="space-y-1 font-medium">
                            <p>Locality / Area <span className="text-orange-500">*</span></p>
                            <Input type={"text"} />
                        </div>
                        <div className="space-y-1 font-medium">
                            <p>Flat no / Building Name <span className="text-orange-500">*</span></p>
                            <Input type={"text"} />
                        </div>
                        <div className="space-y-1 font-medium">
                            <p>Country <span className="text-orange-500">*</span></p>
                            <Input type={"text"} />
                        </div>
                    </div>
                    <div className="pb-4 font-medium border-b flex justify-between items-center">
                        <p>Total</p>
                        <p>₹{subtotal}</p>
                    </div>
                </div>
            </div>
            <Button
                className="h-11 bg-black text-white w-full"
                onClick={async () => {
                    if (cart.length === 0) {
                        alert("Cart is empty");
                        return;
                    }

                    try {
                        const res = await api.post("/orders/create", JSON.stringify({
                            items: cart,
                            shippingAddress: {
                                name: "Temp Name", // later connect inputs
                            },
                        }))

                        if (res.status === 401) {
                            router.push("/login");
                            return;
                        }
                        console.log(res.data.order);

                        router.push(`/payment/${res.data.order._id}`);
                    } catch (err) {
                        console.error(err);
                    }
                }}
            >
                PROCEED TO CHECKOUT
            </Button>

        </div>
    )
}