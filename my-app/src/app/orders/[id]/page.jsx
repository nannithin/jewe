"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Image from "next/image";

export default function OrderDetails({ params }) {
  const { id } = params;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await api.get(`/orders/admin/${id}`);
      setOrder(res.data.order);
    };

    fetchOrder();
  }, []);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-10 space-y-6">

      <h1 className="text-2xl font-semibold">
        Order #{order._id}
      </h1>

      {/* Products */}
      <div className="space-y-4">
        {order.items.map((item) => (
          <div key={item._id} className="flex gap-4 border p-4 rounded-lg">

            <Image
              src={item.image}
              alt={item.title}
              width={80}
              height={80}
              className="object-cover rounded-md"
            />

            <div>
              <p className="font-medium">{item.title}</p>
              <p>₹{item.price}</p>
              <p>Qty: {item.qty}</p>
            </div>

          </div>
        ))}
      </div>

      {/* Shipping */}
      <div>
        <h2 className="font-semibold">Shipping</h2>
        <p>{order.shippingAddress.name}</p>
        <p>{order.shippingAddress.area}</p>
        <p>{order.shippingAddress.city}</p>
        <p>{order.shippingAddress.pincode}</p>
      </div>

      {/* Payment */}
      <div>
        <h2 className="font-semibold">Payment</h2>
        <p>Name: {order.paymentDetails?.name}</p>
        <p>UTR: {order.paymentDetails?.transactionId}</p>
        <p>Amount: ₹{order.paymentDetails?.amount}</p>
      </div>

    </div>
  );
}