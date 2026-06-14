"use client";
import Image from "next/image";
import Hero from "@/app/(pages)/Home/page";
import Services from "@/app/(pages)/Services/page";
import TexhStack from "@/app/(pages)/techStack/page";
import HeroBackground from '@/app/components/animation/HeroBackground';
import Loader from "./components/Loader";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="bg-[#02070b] relative overflow-hidden w-full">
      <Hero />
      {/* <TexhStack /> */}
      <div className="relative z-[20]">
        <Services />
      </div>
    </div>
  );
}
