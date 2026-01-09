"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 to-rose-100 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Contact Us
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Have a question about our products or your order? We’re here to
            help.
          </p>
        </div>
      </section>

      {/* 2. Contact Content */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Get in Touch</h2>
            <p className="text-muted-foreground leading-relaxed">
              Reach out to Cherry Glow for product inquiries, support, or
              collaboration opportunities. Our team will respond as soon as
              possible.
            </p>

            <div className="space-y-4">
              <p>
                <span className="font-medium">Email:</span>{" "}
                support@cherryglow.com
              </p>
              <p>
                <span className="font-medium">Phone:</span> +880 1234 567 890
              </p>
              <p>
                <span className="font-medium">Location:</span> Dhaka, Bangladesh
              </p>
              <p>
                <span className="font-medium">Support Hours:</span> Mon – Sat,
                10:00 AM – 8:00 PM
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Message submitted (demo only)");
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message here..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Support CTA */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-semibold">
            We Care About Your Experience
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Whether it’s skincare advice or order support, Cherry Glow is always
            here for you.
          </p>
        </div>
      </section>
      <section className="w-full py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Our Location</h2>

          <div className="w-full h-[350px] rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Cherry Glow Location"
              src="https://www.google.com/maps?q=Seoul,South%20Korea&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
