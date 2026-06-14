import Image from "next/image";
import Hero from "@/app/(pages)/Home/page";
import Services from "@/app/(pages)/Services/page";

export default function Home() {
  return (
    <div className="bg-[#02070b] relative overflow-hidden w-full">
      <Hero />
      <Services />
    </div>
  );
}
