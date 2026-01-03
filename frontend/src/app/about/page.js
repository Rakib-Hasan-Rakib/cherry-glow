import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProfileCard from "@/components/about/ProfileCard";
import Link from "next/link";

const metadata = {
  title: "About Us - Cherry Glow",
  description:
    "Learn more about Cherry Glow, our story, mission, and the values that drive us to create clean beauty products.",
};

const teamMembers = [
  {
    name: "Mirza Md Mozammel",
    post: "Product Manager",
    imgSrc: "/team members/mirza.jpg",
    desc: "Clean beauty inspired by nature, crafted with science, and made to glow with confidence.",
    facebook: "https://www.facebook.com/mirza.mh.2025",
    instagram: "https://instagram.com",
  },
  {
    name: "Abdullah Al Fahad",
    post: "Product Manager",
    imgSrc: "/team members/fahad.jpg",
    desc: "Clean beauty inspired by nature, crafted with science, and made to glow with confidence.",
    facebook: "https://www.facebook.com/megla.meglaaksh.5",
    instagram: "https://instagram.com",
  },
  {
    name: "Mohiuddin Sajjad",
    post: "Product Manager",
    imgSrc: "/team members/sajjad.jpg",
    desc: "Clean beauty inspired by nature, crafted with science, and made to glow with confidence.",
    facebook: "https://www.facebook.com/ahmed.sajjat.98",
    instagram: "https://instagram.com",
  },
  {
    name: "Rakibul Hasan",
    post: "Product Manager",
    imgSrc: "/team members/rakib.jpg",
    desc: "Clean beauty inspired by nature, crafted with science, and made to glow with confidence.",
    facebook: "https://www.facebook.com/rk.rakib.180625/",
    instagram: null,
  },
  {
    name: "Jahid Parvez",
    post: "Product Manager",
    imgSrc: "/team members/fahad.jpg",
    desc: "Clean beauty inspired by nature, crafted with science, and made to glow with confidence.",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
];
export default function AboutPage() {
  return (
    <main className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 to-rose-100 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About Cherry Glow
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Clean beauty inspired by nature, crafted with science, and made to
            glow with confidence.
          </p>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold">Our Story</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Cherry Glow was born from a simple belief: skincare should be
              effective, gentle, and honest. We started our journey with a
              mission to create products that enhance natural beauty without
              compromising skin health.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every formula is thoughtfully developed, combining modern skincare
              science with carefully selected ingredients.
            </p>
          </div>

          <Image
            src="/logo.png"
            alt="Our Story"
            width={500}
            height={400}
            className="rounded-2xl object-cover"
          />
        </div>
      </section>
      {/* our team */}
      <section className="py-10">
        <h3 className="text-2xl font-semibold my-10 text-center">Our Team</h3>
        {/* Team Members Grid */}
        <div className="mx-auto max-w-7xl px-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <ProfileCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold">Our Mission</h3>
              <p className="mt-4 text-muted-foreground">
                To empower confidence through clean, effective, and affordable
                skincare solutions for every skin type.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold">Our Vision</h3>
              <p className="mt-4 text-muted-foreground">
                To become a trusted beauty brand that prioritizes transparency,
                sustainability, and skin-first innovation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-semibold text-center">
            Why Choose Cherry Glow
          </h2>

          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Dermatologically Tested",
              "Cruelty-Free",
              "Clean Ingredients",
              "Made for All Skin Types",
            ].map((item) => (
              <Card key={item}>
                <CardContent className="p-6 text-center">
                  <p className="font-medium">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Ingredients & Ethics */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <Image
            src="/logo.png"
            alt="Ingredients"
            width={500}
            height={400}
            className="rounded-2xl object-cover"
          />

          <div>
            <h2 className="text-3xl font-semibold">
              Ingredients You Can Trust
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We use carefully sourced ingredients, avoiding harsh chemicals,
              parabens, and unnecessary additives. Our products are cruelty-free
              and responsibly manufactured.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Brand Values */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-semibold">Our Core Values</h2>

          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Transparency",
              "Sustainability",
              "Innovation",
              "Inclusivity",
              "Quality",
              "Customer First",
            ].map((value) => (
              <Card key={value}>
                <CardContent className="p-6">
                  <p className="font-medium">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call To Action */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-semibold">
            Ready to Glow With Confidence?
          </h2>
          <p className="mt-4 opacity-90">
            Discover products crafted to bring out your natural beauty.
          </p>

          <Button
            size="lg"
            className="mt-6 bg-white text-rose-600 hover:bg-white/90 cursor-pointer"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
