'use client';

import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function CustomerCarePage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-32">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-background to-muted/30 px-6 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium tracking-wide text-muted-foreground mb-3">
            CUSTOMER CARE
          </p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-4 text-pretty">
            We're Here to Help
          </h1>
          <p className="text-lg text-muted-foreground font-light">
            Reach out to our team for any questions about your precious pieces
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto md:px-6 px-3 py-12 sm:py-16">
        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 items-center justify-center">
          {/* Email Card */}
          <div className="bg-card border border-border rounded-lg lg:p-8 md:p-6 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-2 md:gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  Email
                </p>
                <p className="text-[18px] font-light">support@yourjewellery.com</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Send us an email and we'll respond within 24 hours
            </p>
          </div>

          {/* Phone Card */}
          <div className="bg-card border border-border rounded-lg lg:p-8 md:p-6 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-2 md:gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  Phone
                </p>
                <p className="text-[18px] font-light">+91 7494825586</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Call us for immediate assistance
            </p>
          </div>

          {/* Hours Card */}
          <div className="bg-card border border-border rounded-lg lg:p-8 md:p-6 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-2 md:gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  Business Hours
                </p>
                <p className="text-[18px] font-light">10 AM – 7 PM IST</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Open 6 days a week for your convenience
            </p>
          </div>

          {/* Location Card */}
          <div className="bg-card border border-border rounded-lg lg:p-8 md:p-6 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-2 md:gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  Visit Us
                </p>
                <p className="text-[18px] font-light">Bhiwani, Haryana</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Explore our collection in person
            </p>
          </div>
        </div>

        {/* Detailed Location Section */}
        <div className="bg-gradient-to-br from-muted/40 to-muted/20 border border-border rounded-lg md:p-8 p-4 sm:p-12 mb-12">
          <h2 className="text-2xl font-light mb-8 tracking-tight">Shop Location</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="text-accent font-semibold tracking-wide text-sm min-w-fit">
                ADDRESS
              </div>
              <div className="text-foreground font-light">
                <p>Brij Wasi Colony</p>
                <p>Gali-1</p>
                <p>Bhiwani, Haryana</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <p className="text-foreground font-light text-lg max-w-2xl mx-auto">
            Each piece in our collection is crafted with precision and passion. 
            Let us help you find your perfect jewel.
          </p>
          <Button className={"uppercase"}>
            Send Inquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
