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
      <div className="relative z-[20]">
        <Services />
      </div>
      <div className="flex items-center  justify-between px-3  bg-[#02070b]">
      <div className="w-[50%]">
        <AboutSection />
      </div>
      <div className="w-[60%]">
        <ContactSection />
      </div>
      </div>
      <div className="bg-amber-200">
        <Footer />
      </div>
    </div>
  );
}
