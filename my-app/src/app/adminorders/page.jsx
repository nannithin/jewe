"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const fetchOrders = async () => {
    const res = await api.get("/orders/admin/orders");
    setOrders(res.data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/admin/orders/status/${id}`, {
      status,
    });

    fetchOrders();
  };

  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10 space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">All Orders</h1>

        <Input
          placeholder="Search by Order ID"
          className="w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-4">Order ID</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4">Change Status</th>
              <th className="p-4">View</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-t">

                <td className="p-4 font-medium break-all">
                  {order._id}
                </td>

                <td className="p-4">
                  ₹{order.totalAmount}
                </td>

                <td className="p-4">
                  {order.paymentStatus}
                </td>

                <td className="p-4">
                  <span className="capitalize">
                    {order.orderStatus}
                  </span>
                </td>

                <td className="p-4">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border rounded p-2"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>

                <td className="p-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(`/admin/orders/${order._id}`)
                    }
                  >
                    View
                  </Button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}