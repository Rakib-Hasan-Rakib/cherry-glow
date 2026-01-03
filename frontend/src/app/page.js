"use client";


import BenefitsSection from "@/components/home/BenefitsSection";
import BestSoldProducts from "@/components/home/BestSoldProducts";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroSection from "@/components/home/HeroSection";
import HighlightsSection from "@/components/home/HighlightSection";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";
import { useEffect, useState } from "react";


export default function Page() {
return (
<main style={{ padding: 24, fontFamily: 'Arial' }}>
    <HeroSection />
    <HighlightsSection />
    <FeaturedProducts />
    <CategoriesSection />
    <BenefitsSection />
    <BestSoldProducts />
    <Testimonials />
    <Newsletter />
</main>
);
}