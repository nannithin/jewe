export default function CustomerCarePage() {
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <h1 className="text-3xl font-semibold mb-6">Customer Care</h1>

      <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
        <p><strong>Email:</strong> support@yourjewellery.com</p>
        <p><strong>Phone:</strong> +91 9876543210</p>
        <p><strong>Working Hours:</strong> 10 AM – 7 PM</p>
        <p className="text-muted-foreground text-sm">
          We’re here to help you with your precious purchases 💎
        </p>
      </div>
    </div>
  );
}
