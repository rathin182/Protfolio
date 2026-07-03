"use client";
import Image from "next/image";
import Hero from "@/app/(pages)/Home/page";
import Services from "@/app/(pages)/Services/page";
import TexhStack from "@/app/(pages)/techStack/page";
import HeroBackground from '@/app/components/animation/HeroBackground';
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import ProjectSection from "./(pages)/Projects/ProjectSection";
import AboutSection from "@/app/components/about/AboutSection";
import ContactSection from "./components/contact/ContactSection";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <div className="bg-[#02070b] relative overflow-hidden w-full">
      <Hero />
      <ProjectSection />
      {/* <TexhStack /> */}
      <div className="relative z-[1000]">
        <Services />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 py-6 bg-[#02070b]">
  <AboutSection />
  <ContactSection />
</div>
      <div className="bg-amber-200">
        <Footer />
      </div>
    </div>
  );
}
