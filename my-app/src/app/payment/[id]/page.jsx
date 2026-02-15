

'use client'

import { useState } from 'react'
import { Check, Copy, QrCode, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import api from "@/lib/axios";
import { useParams } from 'next/navigation'
import qr from '../../../../public/WhatsApp Image 2026-02-13 at 1.19.36 PM.jpeg'
import Image from 'next/image'


export default function PaymentForm() {
  const [formData, setFormData] = useState({
    name: '',
    transactionId: '',
    amount: '',
  })
  const [copied, setCopied] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { id } = useParams();

  const handleCopyUPI = (upi) => {
    navigator.clipboard.writeText(upi)
    setCopied(upi)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async () => {
    try {
      await api.post(`/orders/submit-payment/${id}`, formData);
      alert("Payment submitted. We will verify shortly.");
    } catch (err) {
      console.log(err);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 text-center border-0 shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Payment Received!</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for your payment of ₹{formData.amount}. Your transaction has been confirmed.
          </p>
          <div className="bg-secondary/50 rounded-lg p-4 mb-8 text-left">
            <div className="text-sm text-muted-foreground mb-2">Transaction Details</div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">UTR:</span>
                <span className="font-medium">{formData.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">₹{formData.amount}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              setSubmitted(false)
              setFormData({ name: '', transactionId: '', amount: '' })
            }}
            className="w-full"
          >
            Make Another Payment
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center p-4 pb-32">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Complete Payment</h1>
          <p className="text-muted-foreground">Secure and simple UPI payment transfer</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* UPI QR Section */}
          <div className="border-0 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <QrCode className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Scan & Pay</h2>
              </div>

              <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                <Image
                  src={qr}
                  alt="UPI QR Code"
                  className="w-full aspect-square object-cover rounded-lg bg-secondary/50"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">UPI ID</p>
                  <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-border mb-2">
                    <code className="text-sm font-medium text-foreground flex-1">7494825586@ybl</code>
                    <button
                      onClick={() => handleCopyUPI('7494825586@ybl')}
                      className="p-1.5 hover:bg-secondary rounded transition-colors"
                      aria-label="Copy UPI ID"
                    >
                      {copied === "7494825586@ybl" ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-border">
                    <code className="text-sm font-medium text-foreground flex-1">7494825586@ibl</code>
                    <button
                      onClick={() => handleCopyUPI('7494825586@ibl')}
                      className="p-1.5 hover:bg-secondary rounded transition-colors"
                      aria-label="Copy UPI ID"
                    >
                      {copied === "7494825586@ibl" ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-xs text-muted-foreground mb-1">Processing Time</p>
                  <p className="text-sm font-medium text-foreground">Instant to 2 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form Section */}
          <div className="space-y-6">
            <div className="border-0 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Payment Details</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-border bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="utr" className="text-sm font-medium text-foreground mb-2 block">
                    Transaction ID (UTR)
                  </label>
                  <Input
                    id="utr"
                    placeholder="e.g., 324987538947"
                    value={formData.transactionId}
                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                    className="border-border bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="text-sm font-medium text-foreground mb-2 block">
                    Amount Paid (₹)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="border-border bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full h-12 text-base font-semibold gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Confirm Payment
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            {/* Trust Indicators */}
            <div className="p-4 bg-secondary/30 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground">
                ✓ Secure payment processing • All transactions encrypted • 100% secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
