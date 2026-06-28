import ServicesCarousel from "@/app/components/services/ServicesCarousel";
import ServicesBackground from "@/app/components/services/ServicesBackground";
import HeroBackground from "@/app/components/animation/HeroBackground";
export default function Services() {
    return (
        <div id="services">
            <section className="relative bg-[#02070b] overflow-hidden w-full">
                {/* <ServicesBackground /> */}
                <HeroBackground />

                <div className="relative z-10">
                    <ServicesCarousel />
                </div>
            </section>
        </div>
    );
}