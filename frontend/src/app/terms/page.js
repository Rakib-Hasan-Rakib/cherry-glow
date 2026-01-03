export const metadata = {
  title: "Terms & Conditions | Cherry Glow",
  description:
    "Read the terms and conditions governing the use of the Cherry Glow website and services.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-bold">Terms & Conditions</h1>

      <p className="mb-8 text-muted-foreground">
        Welcome to <strong>Cherry Glow</strong>. By accessing or using our
        website, you agree to be bound by the following Terms & Conditions.
        Please read them carefully before using our services.
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">1. Use of Website</h2>
        <p className="text-muted-foreground">
          By using this website, you confirm that you are at least 18 years old
          or accessing the site under the supervision of a legal guardian. You
          agree to use the website only for lawful purposes and in a manner that
          does not violate any applicable laws or regulations.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">
          2. Products & Information
        </h2>
        <p className="text-muted-foreground">
          We strive to display accurate product descriptions, pricing, and
          images. However, Cherry Glow does not guarantee that all product
          information is error-free, complete, or current. Product colors may
          vary slightly due to screen settings.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">3. Orders & Payments</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>All orders are subject to availability and confirmation.</li>
          <li>Prices may change without prior notice.</li>
          <li>
            Cherry Glow reserves the right to cancel or refuse any order at our
            discretion.
          </li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">4. Shipping & Returns</h2>
        <p className="text-muted-foreground">
          Shipping times, costs, and return eligibility are governed by our
          <strong> Shipping & Returns Policy</strong>. Please review that page
          for detailed information before placing an order.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">5. Intellectual Property</h2>
        <p className="text-muted-foreground">
          All content on this website, including logos, text, images, graphics,
          and designs, is the property of Cherry Glow and is protected by
          intellectual property laws. Unauthorized use or reproduction is
          strictly prohibited.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">6. User Conduct</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Do not misuse or attempt to harm the website</li>
          <li>Do not submit false or misleading information</li>
          <li>Do not engage in fraudulent or abusive behavior</li>
        </ul>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">
          7. Limitation of Liability
        </h2>
        <p className="text-muted-foreground">
          Cherry Glow shall not be liable for any indirect, incidental, or
          consequential damages arising from the use of our website or products,
          to the maximum extent permitted by law.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">8. Third-Party Services</h2>
        <p className="text-muted-foreground">
          Our website may contain links to third-party services such as WhatsApp
          or Facebook Messenger. Cherry Glow is not responsible for the content,
          policies, or practices of these third parties.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">9. Changes to Terms</h2>
        <p className="text-muted-foreground">
          Cherry Glow reserves the right to modify these Terms & Conditions at
          any time. Continued use of the website after changes indicates your
          acceptance of the updated terms.
        </p>
      </section>

      {/* Section 10 */}
      <section>
        <h2 className="mb-3 text-xl font-semibold">10. Contact Information</h2>
        <p className="text-muted-foreground">
          If you have any questions regarding these Terms & Conditions, please
          contact us through our website or messaging platforms.
        </p>
      </section>
    </main>
  );
}
