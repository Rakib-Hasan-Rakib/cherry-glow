import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold">Join Our Glow Community</h2>
        <p className="mt-2 text-muted-foreground">
          Get exclusive offers and beauty tips.
        </p>
        <div className="mt-6">
          <Button>Subscribe</Button>
        </div>
      </div>
    </section>
  );
}
