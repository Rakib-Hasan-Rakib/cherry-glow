import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "FAQ | Cherry Glow",
  description: "Frequently asked questions about Cherry Glow products",
};

const faqs = [
  {
    question: "Are Cherry Glow products safe for sensitive skin?",
    answer:
      "Yes. Our products are dermatologically tested and formulated to be gentle on sensitive skin. However, we always recommend a patch test before full use.",
  },
  {
    question: "Are your products cruelty-free?",
    answer:
      "Absolutely. Cherry Glow is 100% cruelty-free. We do not test on animals at any stage of product development.",
  },
  {
    question: "Where are Cherry Glow products manufactured?",
    answer:
      "Our products are manufactured in certified facilities following international quality and safety standards.",
  },
  {
    question: "How long does delivery usually take?",
    answer:
      "Orders are typically delivered within 3–5 business days, depending on your location.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes. If a product is unused and in its original packaging, you can request a return or exchange within 7 days of delivery.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes. Our support team is available via the Contact page to assist you with any questions or concerns.",
  },
];

export default function FAQPage() {
  return (
    <main className="py-20">
      <div className="mx-auto max-w-3xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know about Cherry Glow
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4 lg:grid-cols-2 cursor-pointer">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="rounded-xl border bg-background px-4"
            >
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
