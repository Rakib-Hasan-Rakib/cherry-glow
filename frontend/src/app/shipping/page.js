export const metadata = {
  title: "Shipping & Returns | Cherry Glow",
  description:
    "Learn about Cherry Glow shipping timelines, delivery areas, and return policies.",
};

export default function ShippingAndReturnsPage() {
  return (
    <main className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl font-bold">Shipping & Returns</h1>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know about delivery and returns at Cherry
            Glow
          </p>
        </div>

        {/* Shipping Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Shipping Information</h2>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              We aim to process and ship all orders as quickly as possible.
              Orders are typically processed within{" "}
              <strong>1–2 business days</strong>.
            </p>

            <p>
              Delivery usually takes <strong>3–5 business days</strong>,
              depending on your location and courier availability.
            </p>

            <p>
              Once your order is shipped, you will receive a confirmation
              message with tracking details (when available).
            </p>

            <p>
              Please note that delivery times may vary during promotional
              periods, holidays, or due to unforeseen circumstances.
            </p>
          </div>
        </section>

        {/* Delivery Areas */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Delivery Areas</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Cherry Glow currently delivers across Bangladesh. We are actively
            working to expand our delivery services to more regions in the
            future.
          </p>
        </section>

        {/* Returns Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Returns & Exchanges</h2>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Your satisfaction is important to us. If you are not fully
              satisfied with your purchase, you may request a return or exchange
              within
              <strong> 7 days</strong> of receiving your order.
            </p>

            <p>To be eligible for a return:</p>

            <ul className="list-disc space-y-2 pl-5">
              <li>The product must be unused and unopened</li>
              <li>The product must be in its original packaging</li>
              <li>Proof of purchase is required</li>
            </ul>

            <p>
              For hygiene and safety reasons, we cannot accept returns on opened
              or used beauty products.
            </p>
          </div>
        </section>

        {/* Refunds */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Refund Policy</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Once your return is received and inspected, we will notify you of
            the approval or rejection of your refund. Approved refunds will be
            processed within <strong>5–7 business days</strong> to your original
            payment method.
          </p>
        </section>

        {/* Contact CTA */}
        <section className="rounded-2xl bg-muted/30 p-6 text-center">
          <h3 className="text-lg font-semibold">Need Help?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            If you have any questions about shipping, returns, or your order,
            feel free to contact our support team.
          </p>
        </section>
      </div>
    </main>
  );
}
