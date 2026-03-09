"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronRight, Search, Package } from "lucide-react";

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

  const getStatusBadge = (status) => {
    const statusStyles = {
      processing: "bg-amber-100 text-amber-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-emerald-100 text-emerald-800",
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800";
  };

  const getPaymentStatusBadge = (status) => {
    return status === "completed"
      ? "text-emerald-600 font-medium"
      : "text-amber-600 font-medium";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-semibold text-foreground">
                Orders Collection
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Manage all customer orders and shipments
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by Order ID"
              className="pl-12 py-6 text-base border-2 border-border hover:border-primary/30 focus:border-primary/50 rounded-xl bg-card shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Orders Grid - Desktop Table */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/40 hover:bg-secondary/50 transition">
                    <th className="px-8 py-5 text-left font-serif font-semibold text-foreground text-sm">
                      Order ID
                    </th>
                    <th className="px-8 py-5 text-left font-serif font-semibold text-foreground text-sm">
                      Total Amount
                    </th>
                    <th className="px-8 py-5 text-left font-serif font-semibold text-foreground text-sm">
                      Payment Status
                    </th>
                    <th className="px-8 py-5 text-left font-serif font-semibold text-foreground text-sm">
                      Order Status
                    </th>
                    <th className="px-8 py-5 text-left font-serif font-semibold text-foreground text-sm">
                      Update Status
                    </th>
                    <th className="px-8 py-5 text-right font-serif font-semibold text-foreground text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredOrders.map((order, index) => (
                    <tr
                      key={order._id}
                      className="hover:bg-secondary/20 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <code className="text-xs font-mono bg-muted/40 px-3 py-2 rounded-lg text-foreground break-all">
                          {order._id}
                        </code>
                      </td>
                      <td className="px-8 py-5">
                        <span className="font-semibold text-foreground text-lg">
                          ₹{order.totalAmount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`text-sm font-semibold ${getPaymentStatusBadge(order.paymentStatus)}`}>
                          {order.paymentStatus.charAt(0).toUpperCase() +
                            order.paymentStatus.slice(1)}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-semibold capitalize ${getStatusBadge(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            updateStatus(order._id, e.target.value)
                          }
                          className="px-4 py-2 border border-border rounded-lg bg-card text-sm font-medium text-foreground hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        >
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <Button
                          onClick={() =>
                            router.push(`/orders/${order._id}`)
                          }
                          className="text-primary-foreground font-semibold rounded-lg inline-flex items-center gap-2 transition-all"
                        >
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Orders Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md border border-border p-5 space-y-4"
            >
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">
                  Order ID
                </p>
                <code className="text-xs font-mono bg-muted/40 px-2 py-1 rounded break-all">
                  {order._id}
                </code>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">
                    Total
                  </p>
                  <p className="font-semibold text-foreground">
                    ₹{order.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">
                    Payment
                  </p>
                  <p className={`text-sm font-semibold ${getPaymentStatusBadge(order.paymentStatus)}`}>
                    {order.paymentStatus.charAt(0).toUpperCase() +
                      order.paymentStatus.slice(1)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">
                  Order Status
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">
                  Update Status
                </p>
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-card text-sm font-medium text-foreground"
                >
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <Button
                onClick={() => router.push(`/admin/orders/${order._id}`)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex p-4 bg-muted/20 rounded-full mb-4">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
              No orders found
            </h3>
            <p className="text-muted-foreground">
              {search ? "Try adjusting your search criteria" : "Orders will appear here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
