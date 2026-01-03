import Image from "next/image";

export const metadata = {
  title: "About Us | Cherry Glow",
  description: "Learn more about Cherry Glow and what makes us special.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#FFFDEB]">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="/images/about-hero.jpg"
          alt="About Cherry Glow"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">About Us</h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base">
            From passionate beginnings to a trusted beauty brand, Cherry Glow is
            dedicated to confidence, care, and authenticity.
          </p>
          <button className="mt-6 rounded-full bg-yellow-300 px-6 py-2 text-sm font-semibold text-black hover:bg-yellow-400">
            See More
          </button>
        </div>
      </section>

      {/* KEEP YOUR OLD ABOUT SECTIONS HERE */}
      {/* Example placeholder – do not delete your existing content */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        {/* Your existing about content stays here */}
      </section>

      {/* FEATURE SECTIONS (ALTERNATING) */}
      <section className="mx-auto max-w-6xl space-y-24 px-4 py-16">
        {features.map((item, index) => (
          <div
            key={item.title}
            className={`flex flex-col items-center gap-10 md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-muted-foreground">{item.description}</p>
              <button className="mt-6 rounded-full bg-yellow-300 px-5 py-2 text-sm font-medium hover:bg-yellow-400">
                View More
              </button>
            </div>

            <div className="relative flex-1">
              <div className="absolute -left-4 -top-4 h-full w-full rounded-full bg-yellow-200" />
              <Image
                src={item.image}
                alt={item.title}
                width={350}
                height={350}
                className="relative rounded-full object-cover"
              />
            </div>
          </div>
        ))}
      </section>

      {/* PEOPLE SECTION (5 PEOPLE) */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="mb-12 text-3xl font-bold">Meet Our People</h2>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
            {people.map((person) => (
              <div key={person.name} className="text-center">
                <Image
                  src={person.image}
                  alt={person.name}
                  width={140}
                  height={140}
                  className="mx-auto rounded-full object-cover"
                />
                <p className="mt-4 font-semibold">{person.name}</p>
                <p className="text-sm text-muted-foreground">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* DATA */

const features = [
  {
    title: "Developing Confident & Radiant Beauty",
    description:
      "We focus on empowering individuals through safe, effective, and thoughtfully crafted beauty products.",
    image: "/images/about-1.jpg",
  },
  {
    title: "Enjoy Learning with a Unique Experience",
    description:
      "Every product is designed to elevate your routine and bring joy to everyday self-care.",
    image: "/images/about-2.jpg",
  },
  {
    title: "Passionate Experts Who Make a Difference",
    description:
      "Our team is driven by innovation, research, and a deep love for skincare excellence.",
    image: "/images/about-3.jpg",
  },
];

const people = [
  { name: "Ariana Lee", role: "Founder", image: "/images/person-1.jpg" },
  { name: "Sophia Kim", role: "Product Lead", image: "/images/person-2.jpg" },
  { name: "Emily Chen", role: "Marketing Head", image: "/images/person-3.jpg" },
  { name: "Noah Park", role: "Operations", image: "/images/person-4.jpg" },
  {
    name: "Liam Brooks",
    role: "Brand Strategist",
    image: "/images/person-5.jpg",
  },
];
