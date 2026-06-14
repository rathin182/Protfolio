"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Code2, ShieldCheck, CloudCog, Gauge, Bug, LayoutDashboard, } from "lucide-react";
import CrackedCard from "./CrackedCard";
import ServiceModal from "./ServiceModal";

const services = [
    {
        title: "Full Stack Development",
        description: "End-to-end web application development.",
        icon: Code2,
    },
    {
        title: "Authentication & Authorization",
        description: "Secure auth systems and permissions.",
        icon: ShieldCheck,
    },
    {
        title: "Deployment & DevOps",
        description: "Docker, CI/CD, Nginx and cloud deployment.",
        icon: CloudCog,
    },
    {
        title: "Performance Optimization",
        description: "Frontend, backend and database optimization.",
        icon: Gauge,
    },
    {
        title: "Bug Fixing & Maintenance",
        description: "Fix bugs and maintain production systems.",
        icon: Bug,
    },
    {
        title: "Custom Admin Dashboards",
        description: "Powerful dashboards tailored to your business.",
        icon: LayoutDashboard,
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
        <section className="relative w-full overflow-hidden py-24">
            <div className="mb-14 px-10">
                <p className="text-sm font-semibold tracking-[0.3em] uppercase text-white/60">
                    Services
                </p>

                <div className="mt-3 h-[3px] w-16 bg-[#52ca56]" />
            </div>

            <motion.div
                drag="x"
                dragElastic={0.08}
                dragMomentum
                style={{ x }}
                onDragStart={() =>
                    controlsRef.current?.stop()
                }
                onDragEnd={() => {
                    startAutoScroll();
                }}
                className=" flex gap-8 px-10 cursor-grab active:cursor-grabbing w-max "
            >
                {duplicated.map(
                    (service, index) => {
                        const Icon = service.icon;

                        return (
                            <CrackedCard
                                key={`${service.title}-${index}`}
                                onExplode={() => {
                                    stopAutoScroll();

                                    setTimeout(() => {
                                        setSelectedService(service);
                                        setModalOpen(true);
                                    }, 2500);
                                }}
                            >
                                <motion.div

                                    whileHover={{
                                        scale: 1.03,
                                        y: -10,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 250,
                                    }}
                                    className=" group relative min-w-[420px] max-w-[420px] rounded-3xl border border-[#52ca56]/15 bg-[#071018] p-8 overflow-hidden ">
                                    {/* Glow */}
                                    <div
                                        className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                    bg-[radial-gradient(circle_at_center,#52ca5620,transparent_70%)]
                  "
                                    />

                                    {/* Border Beam */}
                                    <motion.div
                                        animate={{
                                            x: ["-150%", "250%", "-150%"],
                                        }}
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className=" absolute left-0 top-1/2 h-[350%] w-28 -translate-y-1/2 rotate-12 bg-gradient-to-r from-transparent via-[#52ca56]/25 to-transparent blur-sm" />

                                    {/* Icon */}
                                    <motion.div
                                        animate={{
                                            y: [
                                                0,
                                                -5,
                                                0,
                                            ],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                        }}
                                        className=" mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#52ca56]/20 bg-[#52ca56]/5 ">
                                        <Icon
                                            size={30}
                                            className="text-[#52ca56]"
                                        />
                                    </motion.div>

                                    <h3 className="mb-4 text-2xl font-semibold text-white">
                                        {service.title}
                                    </h3>

                                    <p className="leading-8 text-white/60">
                                        {service.description}
                                    </p>

                                    <div
                                        className=" absolute bottom-0 left-0 h-[2px] w-0 bg-[#52ca56] transition-all duration-500 group-hover:w-full " />
                                </motion.div>
                            </CrackedCard>
                        );
                    }
                )}
            </motion.div>
            <ServiceModal
                open={modalOpen}
                service={selectedService}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedService(null);

                    startAutoScroll();
                }}
            />
        </section>
    );
}