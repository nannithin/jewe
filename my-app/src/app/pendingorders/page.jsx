"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminPayments() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    const res = await api.get("/orders/admin/pending-payments");
    setOrders(res.data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const approve = async (id) => {
    await api.put(`/orders/admin/approve/${id}`);
    fetchOrders();
  };

  const reject = async (id) => {
    await api.put(`/orders/admin/reject/${id}`);
    fetchOrders();
  };

  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(search.toLowerCase()) ||
    order.paymentDetails?.transactionId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-8">

      {/* Header */}
      <div className="space-y-5 mb-10">
        <div>
          <h1 className="text-3xl font-semibold">Payment Verification</h1>
          <p className="text-muted-foreground text-sm">
            Review and approve manual UPI payments
          </p>
        </div>

        <div className="w-80">
          <Input
            placeholder="Search by Order ID / UTR"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center text-3xl">
            💳
          </div>
          <h2 className="mt-5 text-xl font-medium">No Pending Payments</h2>
          <p className="text-muted-foreground text-sm">
            All payments are verified 🎉
          </p>
        </div>
      )}

      {/* Orders Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white/70 backdrop-blur-xl border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >

            {/* Top Section */}
            <div className="flex justify-between items-start mb-5">
              <div>
                <p className="text-xs text-muted-foreground">Order ID</p>
                <p className="text-sm font-medium break-all">
                  {order._id}
                </p>
              </div>

              <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
                Pending
              </span>
            </div>

            {/* Order Info */}
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span className="font-semibold">
                  ₹{order.totalAmount}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Payer Name</span>
                <span>{order.paymentDetails?.name}</span>
              </div>

              <div className="flex justify-between">
                <span>UTR</span>
                <span className="font-medium">
                  {order.paymentDetails?.transactionId}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Paid Amount</span>
                <span>
                  ₹{order.paymentDetails?.amount}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
                onClick={() => approve(order._id)}
              >
                Approve
              </Button>

              <Button
                variant="outline"
                className="flex-1 border-red-400 text-red-600 hover:bg-red-50"
                onClick={() => reject(order._id)}
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
