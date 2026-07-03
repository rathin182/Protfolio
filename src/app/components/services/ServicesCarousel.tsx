"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Code2, ShieldCheck, CloudCog, Gauge, Bug, LayoutDashboard, } from "lucide-react";
import CrackedCard from "./CrackedCard";
import ServiceModal from "./ServiceModal";

const services = [
    {
        title: "Custom Web Applications",
        description:
            "Build fast, scalable web applications tailored to your business needs.",
        icon: Code2,
    },
    {
        title: "SaaS Product Development",
        description:
            "Turn your idea into a complete SaaS platform with modern technologies.",
        icon: LayoutDashboard,
    },
    {
        title: "API Development & Integration",
        description:
            "Create secure APIs and connect third-party services into your applications.",
        icon: CloudCog,
    },
    {
        title: "Admin Dashboards",
        description:
            "Build powerful dashboards to manage users, data, analytics, and operations.",
        icon: Gauge,
    },
    {
        title: "Database Management",
        description:
            "Design reliable databases and optimize performance for growing applications.",
        icon: ShieldCheck,
    },
    {
        title: "Maintenance & Support",
        description:
            "Fix issues, improve existing systems, and provide long-term technical support.",
        icon: Bug,
    },
];

const duplicated = [...services, ...services];

export default function ServicesCarousel() {
    const x = useMotionValue(0);
    const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
    const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);

    const [modalOpen, setModalOpen] = useState(false);


    const startAutoScroll = () => {
        controlsRef.current?.stop();

        controlsRef.current = animate(
            x,
            [-0, -1800],
            {
                ease: "linear",
                duration: 40,
                repeat: Infinity,
            }
        );
    };
    const stopAutoScroll = () => {
        controlsRef.current?.stop();
    };
    useEffect(() => {
        startAutoScroll();

        return () => {
            controlsRef.current?.stop();
        };
    }, []);

    return (
       <section className="relative py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
  <div className="max-w-[1600px] mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16 lg:gap-6 items-start">
      {services.map((service, index) => {
        const Icon = service.icon;
        const isLastInRow =
          (index + 1) % 6 === 0 || index === services.length - 1;

        return (
          <CrackedCard
            key={service.title}
            onExplode={() => {
              setTimeout(() => {
                setSelectedService(service);
                setModalOpen(true);
              }, 2500);
            }}
          >
            <motion.div
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="
                relative
                flex
                flex-col
                items-center
                text-center
                group
                cursor-pointer
              "
            >
              {/* Connector - only shown on the xl 6-col row layout */}
              {!isLastInRow && (
                <div
                  className="
                    hidden
                    xl:flex
                    absolute
                    top-[58px]
                    -right-6
                    items-center
                    gap-2
                  "
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#52ca56]" />
                  {/* <div className="w-10 h-[1px] bg-[#52ca56]/30" /> */}
                </div>
              )}

              {/* Hexagon */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                style={{
                  clipPath:
                    "polygon(25% 6%,75% 6%,100% 50%,75% 94%,25% 94%,0 50%)",
                }}
                className="
                  relative
                  w-24
                  h-24
                  sm:w-28
                  sm:h-28
                  md:w-32
                  md:h-32
                  flex
                  items-center
                  justify-center
                  border
                  border-[#52ca56]/60
                  mb-4
                  sm:mb-5
                  transition-all
                  duration-500
                  group-hover:border-[#52ca56]
                  group-hover:shadow-[0_0_40px_rgba(82,202,86,0.25)]
                "
              >
                {/* glow */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-500
                    bg-[radial-gradient(circle,#52ca5625,transparent_70%)]
                  "
                />

                <Icon
                  size={40}
                  className="text-[#52ca56] relative z-10 w-9 h-9 sm:w-11 sm:h-11 md:w-[52px] md:h-[52px]"
                />
              </motion.div>

              {/* Title */}
              <h3
                className="
                  text-white
                  font-semibold
                  text-base
                  sm:text-lg
                  leading-tight
                  mb-2
                  sm:mb-3
                  px-2
                "
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="
                  text-white/50
                  text-xs
                  sm:text-sm
                  leading-6
                  max-w-[220px]
                  mx-auto
                "
              >
                {service.description}
              </p>
            </motion.div>
          </CrackedCard>
        );
      })}
    </div>
  </div>

  <ServiceModal
    open={modalOpen}
    service={selectedService}
    onClose={() => {
      setModalOpen(false);
      setSelectedService(null);
    }}
  />
</section>
    );
}