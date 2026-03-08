'use client';

import { useRouter } from "next/navigation";
import { ChevronRight, Sparkles } from "lucide-react";

export default function OrderCard({ order }) {
  const router = useRouter();
  console.log(order);
  
  const getPaymentStatusColor = (status) => {
    return status === "completed"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-amber-100 text-amber-700";
  };

  const getOrderStatusColor = (status) => {
    const colors = {
      processing: "bg-blue-100 text-blue-700",
      shipped: "bg-purple-100 text-purple-700",
      delivered: "bg-emerald-100 text-emerald-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div
      onClick={() => router.push(`/orders/${order?._id}`)}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-border overflow-hidden transition-all duration-300 cursor-pointer max-w-md w-full mx-auto"
    >
      {/* Top Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary/60" />

      <div className="p-6 sm:p-8 space-y-6">
        {/* Header with Icon */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Order ID
            </p>
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-foreground">
              #{order._id.slice(-6).toUpperCase()}
            </h2>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Product Section */}
        <div className="space-y-2 border-t border-b border-border py-4">
          <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Product
          </p>
          <p className="text-base sm:text-lg font-medium text-foreground line-clamp-2">
            {order.items[0]?.title || "Premium Jewellery"}
          </p>
        </div>

        {/* Total Amount */}
        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Total Amount
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-primary">
              ₹{order.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="space-y-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Payment Status
            </p>
            <span
              className={`inline-block px-4 py-2 text-xs sm:text-sm font-semibold rounded-full capitalize transition ${getPaymentStatusColor(
                order.paymentStatus
              )}`}
            >
              {order.paymentStatus.charAt(0).toUpperCase() +
                order.paymentStatus.slice(1)}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Order Status
            </p>
            <span
              className={`inline-block px-4 py-2 text-xs sm:text-sm font-semibold rounded-full capitalize transition ${getOrderStatusColor(
                order.orderStatus
              )}`}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Date and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <div className="flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
            View <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
