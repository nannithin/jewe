"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Check, CreditCard, Package } from "lucide-react";

export default function OrderDetails() {
  const { id } = useParams();
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
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full">
            <span className="text-xs font-semibold text-primary">ORDER CONFIRMED</span>
          </div>
          <h1 className="text-4xl font-light tracking-wide mb-2">
            Thank You for Your Purchase
          </h1>
          <p className="text-muted-foreground">
            Order #{order._id}
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Confirmation Status */}
        <div className="mb-12 p-6 bg-card rounded-lg border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Your order has been received and is being prepared with care.
            </p>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Estimated delivery: 5-7 business days
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-12">
          <h2 className="text-xl font-light tracking-wide mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Your Items
          </h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex gap-6 p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="object-cover rounded-lg bg-secondary"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-light text-lg tracking-wide mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Quantity: {item.qty}
                    </p>
                  </div>
                  <p className="text-xl font-light text-primary">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        {/* <div className="mb-12 p-6 bg-secondary/30 border border-border rounded-lg">
          <h3 className="font-light text-lg tracking-wide mb-6">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>₹{shipping.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (10%)</span>
              <span>₹{tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-border pt-3 mt-3">
              <div className="flex justify-between">
                <span className="font-light text-lg">Total</span>
                <span className="text-2xl font-light text-primary">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div> */}

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Shipping Details */}
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="font-light text-lg tracking-wide mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Shipping Address
            </h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p className="text-muted-foreground">{order.shippingAddress.area}</p>
              <p className="text-muted-foreground">{order.shippingAddress.city}</p>
              <p className="text-muted-foreground">{order.shippingAddress.pincode}</p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="font-light text-lg tracking-wide mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Payment Details
            </h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{order.paymentDetails.name}</p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-muted-foreground mb-1">Transaction ID</p>
                <p className="font-mono text-xs tracking-widest">{order.paymentDetails.transactionId}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-muted-foreground mb-1">Amount Paid</p>
                <p className="text-lg font-light text-primary">₹{order.paymentDetails.amount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <h3 className="font-light text-lg tracking-wide mb-3">What's Next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ We'll send you a tracking link via email once your order ships</li>
            <li>✓ Your jewelry is carefully packaged in our signature packaging</li>
            <li>✓ All items are insured during transit</li>
            <li>✓ Contact us anytime for order updates</li>
          </ul>
        </div>
      </div>
    </main>
  );
}