export const metadata = {
  title: "Privacy Policy | Cherry Glow",
  description:
    "Learn how Cherry Glow collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

      <p className="mb-8 text-muted-foreground">
        At <strong>Cherry Glow</strong>, your privacy is very important to us.
        This Privacy Policy explains how we collect, use, and protect your
        personal information when you visit or interact with our website.
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">
          1. Information We Collect
        </h2>
        <p className="text-muted-foreground">
          We may collect the following types of information:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
          <li>
            Personal details such as name, email address, and phone number
          </li>
          <li>Shipping and billing information when placing an order</li>
          <li>Messages sent via WhatsApp, Messenger, or contact forms</li>
          <li>Basic usage data such as pages visited and device type</li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>To process and deliver your orders</li>
          <li>To respond to inquiries and customer support requests</li>
          <li>To improve our products, services, and website experience</li>
          <li>To send important updates related to your orders</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">
          3. Cookies & Tracking Technologies
        </h2>
        <p className="text-muted-foreground">
          Cherry Glow may use cookies and similar technologies to enhance user
          experience, analyze website traffic, and understand user behavior. You
          can control or disable cookies through your browser settings.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">
          4. Sharing of Information
        </h2>
        <p className="text-muted-foreground">
          We do <strong>not</strong> sell or rent your personal information.
          Your data may only be shared with trusted service providers (such as
          delivery or payment partners) strictly for business operations.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">5. Data Security</h2>
        <p className="text-muted-foreground">
          We take appropriate security measures to protect your personal data
          against unauthorized access, alteration, or disclosure. However, no
          online system is 100% secure.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">6. Third-Party Links</h2>
        <p className="text-muted-foreground">
          Our website may contain links to third-party websites. Cherry Glow is
          not responsible for the privacy practices or content of those sites.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">7. Your Rights</h2>
        <p className="text-muted-foreground">
          You have the right to access, update, or request deletion of your
          personal information. You may contact us at any time regarding your
          data.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">
          8. Changes to This Policy
        </h2>
        <p className="text-muted-foreground">
          Cherry Glow may update this Privacy Policy from time to time. Any
          changes will be posted on this page with an updated revision date.
        </p>
      </section>

      {/* Section 9 */}
      <section>
        <h2 className="mb-3 text-xl font-semibold">9. Contact Us</h2>
        <p className="text-muted-foreground">
          If you have any questions about this Privacy Policy, please contact us
          via WhatsApp, Messenger, or email.
        </p>
      </section>
    </main>
  );
}
