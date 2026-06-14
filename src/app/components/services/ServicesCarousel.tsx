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
        <section className="relative w-full overflow-hidden py-20">
            {/* <div className="group mb-14 px-10 inline-block py-4">
                <p className="text-sm font-semibold tracking-[0.3em] uppercase text-white/60 hover:scale-105">
                    Services
                </p>

                <div className="mt-3 h-[3px] overflow-hidden">
                    <div className=" h-full w-16 bg-[#52ca56] origin-left transition-transform duration-500 ease-out group-hover:scale-x-300 "  />
                </div>
            </div> */}

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
                                        className=" absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,#52ca5620,transparent_70%)] " />

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
                                    />

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