"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Order ID</p>
                  <p className="text-sm font-medium break-all">
                    {order._id}
                  </p>
                </div>

                <span className={`px-3 py-1 text-xs rounded-full font-medium
                  ${order.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"}
                `}>
                  {order.paymentStatus}
                </span>
              </div>

              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold">
                    ₹{order.totalAmount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span>{order.orderStatus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
