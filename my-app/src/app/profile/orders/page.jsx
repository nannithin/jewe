"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderCard from "@/components/ordercard";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/userorders");
        console.log(res);
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <h1 className="text-3xl font-semibold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Package size={60} className="text-neutral-300" />
          <h2 className="mt-6 text-xl font-medium">No Orders Yet</h2>
          <p className="text-muted-foreground text-sm">
            Your beautiful jewellery pieces will appear here 💎
          </p>
          <Button className="mt-6 bg-black text-white">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
