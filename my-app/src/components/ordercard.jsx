export default function OrderCard({ order }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8 max-w-md w-full mx-auto hover:shadow-md transition">
      
      {/* Order ID */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">
        Order #{order._id.slice(-6)}
      </h2>

      {/* Product */}
      <div className="space-y-4 text-gray-600">
        <div>
          <p className="text-sm sm:text-base">Product</p>
          <p className="text-lg sm:text-xl font-medium text-black">
            {order.items[0]?.title}
          </p>
        </div>

        {/* Total */}
        <div>
          <p className="text-sm sm:text-base">Total Amount</p>
          <p className="text-2xl sm:text-3xl font-semibold text-black">
            ${order.totalAmount}
          </p>
        </div>

        {/* Status Row */}
        <div className="flex flex-wrap gap-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">Payment:</span>
            <span className={`px-3 py-1 text-xs rounded-full ${order.paymentStatus === 'pain' ? "bg-emerald-100 text-emerald-600" : "bg-yellow-100 text-yellow-700"} `}>
              {order.paymentStatus}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm">Order:</span>
            <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700">
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Date */}
        <p className="text-sm pt-3 text-gray-500">
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}