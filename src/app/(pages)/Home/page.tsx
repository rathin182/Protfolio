"use client";
import React, { useEffect } from 'react'
import { ArrowDownFromLine, ArrowDownToLine, ArrowRight, MoveRight, Send, Menu, X } from 'lucide-react';

import Image from 'next/image';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroText from '@/app/components/animation/HeroText';
import { Canvas } from "@react-three/fiber";
import HeroParticles from '@/app/components/animation/HeroParticles';
import HeroBackground from '@/app/components/animation/HeroBackground';
import TechStackCards from '@/app/components/TechStackCards';
import TexhStack from "@/app/(pages)/techStack/page";
import Link from 'next/link';

const middleText = "Web Applications";

const navItems = [
    {
        label: "Home",
        href: "home",
    },
    {
        label: "About",
        href: "about",
    },
    {
        label: "Projects",
        href: "projects",
    },
    {
        label: "Services",
        href: "services",
    }
];

const Hero = () => {

    const [active, setActive] = useState("Home");
    const [typedText, setTypedText] = useState("");
    const [topVisible, setTopVisible] = useState(true);
    const [bottomVisible, setBottomVisible] = useState(true);
    const [phase, setPhase] = useState("typing");
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // update active when URL changes
    // useEffect(() => {
    //     const handleHashChange = () => {
    //         const hash = window.location.hash.replace("#", "");
    //         if (hash) setActive(hash);
    //     };

    //     handleHashChange();
    //     window.addEventListener("hashchange", handleHashChange);

    //     return () => window.removeEventListener("hashchange", handleHashChange);
    // }, []);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/Rathin_Bagchi_Resume.pdf";
        link.download = "Rathin_Bagchi_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const sections = navItems
            .map((item) => document.getElementById(item.href))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const section = navItems.find(
                            (item) => item.href === entry.target.id
                        );

                        if (section) {
                            setActive(section.label);
                        }
                    }
                });
            },
            {
                threshold: 0.55,
            }
        );

        sections.forEach((section) => observer.observe(section!));

        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const handleClick = (item: any) => {
        setActive(item);
        window.location.hash = item; // 👈 updates URL like #Home
    };

    const scrollToProjects = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        setMobileMenuOpen(false);
    };
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (phase === "typing") {
            if (typedText.length < middleText.length) {
                timeout = setTimeout(() => {
                    setTypedText(
                        middleText.slice(0, typedText.length + 1)
                    );
                }, 90);
            } else {
                timeout = setTimeout(() => {
                    setPhase("hide");
                }, 1200);
            }
        }

        if (phase === "hide") {
            setTopVisible(false);
            setBottomVisible(false);

            timeout = setTimeout(() => {
                setPhase("destroy");
            }, 1500);
        }

        if (phase === "destroy") {
            timeout = setTimeout(() => {
                setTypedText("");
                setTopVisible(true);
                setBottomVisible(true);
                setPhase("typing");
            }, 2000);
        }

        return () => clearTimeout(timeout);
    }, [typedText, phase]);

    return (
        <div className='bg-[#02070b] relative overflow-hidden min-h-screen w-full'>
            <HeroBackground />
            <div className='h-full'>
                {/* Navigation */}
                <header className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-2 transition-all duration-500
        ${scrolled
                        ? `
                bg-white/[0.03]
                backdrop-blur-md
                border-b
                border-white/10
                shadow-[0_8px_32px_rgba(0,0,0,0.15)]
              `
                        : `
                bg-transparent
                border-transparent
              `
                    }
    `}>
                    <div className='py-2 sm:py-3 shrink-0'>
                        <Image
                            src="/logonobg2.png"
                            alt="Vercel Logo"
                            width={40}
                            height={24}
                            className="w-8 h-auto sm:w-9 md:w-10"
                        />
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:block">
                        <ul className="relative flex gap-4 lg:gap-8">
                            {navItems.map((item) => (
                                <li
                                    key={item.href}
                                    onClick={() => handleClick(item.label)}
                                    style={{
                                        fontFamily: "var(--font-playfair)",
                                    }}
                                    className={`relative cursor-pointer text-sm lg:text-md transition-all duration-300 ${active === item.label
                                        ? "text-[#52ca56]"
                                        : "text-white hover:text-[#52ca56]"
                                        }`}
                                >
                                    <button
                                        onClick={() => scrollToProjects(item.href)}
                                        className="relative block font-medium"
                                    >
                                        {item.label}

                                        <span
                                            className={`absolute left-0 -bottom-1 h-[2px] bg-[#52ca56] transition-all duration-300 ${active === item.label ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:block shrink-0">
                        <button
                            onClick={() => scrollToProjects("contact")}
                            className="cursor-pointer group relative overflow-hidden rounded-xl border border-[#52ca56]/30 bg-black px-4 lg:px-8 py-2 lg:py-3 font-semibold text-white transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:border-[#52ca56] hover:shadow-[0_0_40px_rgba(82,202,86,0.25)]"
                        >

                            {/* 🌟 Radial Glow Burst */}
                            <span className="absolute inset-0 scale-0 opacity-0 rounded-full bg-[#52ca56]/20 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100"></span>

                            {/* ⚡ Inner Pulse */}
                            <span className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-[#52ca56]/10 to-transparent transition-all duration-500 group-hover:opacity-100 group-hover:animate-pulse"></span>

                            {/* 🔮 Soft Border Glow */}
                            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[inset_0_0_20px_rgba(82,202,86,0.2)]"></span>

                            {/* Content */}
                            <div
                                style={{
                                    fontFamily: "var(--font-playfair)",
                                }}
                                className="relative z-10 flex items-center gap-2">
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    <Send size={16} />
                                </span>
                                <span className="tracking-wide group-hover:tracking-wider transition-all duration-300 text-sm lg:text-base">
                                    Lets Connect
                                </span>
                            </div>

                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2 z-[1100]"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </header>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[1050] bg-[#02070b]/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
                        >
                            <ul className="flex flex-col items-center gap-6">
                                {navItems.map((item) => (
                                    <li
                                        key={item.href}
                                        style={{ fontFamily: "var(--font-playfair)" }}
                                        className={`text-2xl font-medium transition-all duration-300 ${active === item.label ? "text-[#52ca56]" : "text-white"
                                            }`}
                                    >
                                        <button onClick={() => { handleClick(item.label); scrollToProjects(item.href); }}>
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => scrollToProjects("contact")}
                                className="mt-4 flex items-center gap-2 rounded-xl border border-[#52ca56]/30 bg-black px-8 py-3 font-semibold text-white"
                                style={{ fontFamily: "var(--font-playfair)" }}
                            >
                                <Send size={16} />
                                <span>Lets Connect</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* main Section */}
                <main
                    id='home'
                    style={{
                        fontFamily: "var(--font-open-sans)",
                    }}
                    className='px-4 sm:px-6 md:px-10 lg:px-14 xl:px-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-4 min-h-screen pt-28 pb-16 lg:pt-0 lg:pb-0 lg:h-[84%] lg:mt-10 text-center lg:text-left'>
                    <div className='flex flex-col gap-4 items-center lg:items-start order-2 lg:order-1'>
                        {/* Main Heading */}
                        <HeroText />
                        {/* Sub Heading */}
                        {/* <div className='flex flex-col '>
                        <span className='text-xl'>Full Stack Developer specializing in building modern web</span>
                        <span className='text-xl'>applications with secure authentication, clean Ul and</span>
                        <span className='text-xl'>production ready deployment.</span>
                    </div> */}
                        {/* buttons */}
                        <div className="flex flex-wrap justify-center lg:justify-start mt-4 gap-4">
                            {/* View My Work */}
                            <button onClick={() => scrollToProjects("projects")} className="cursor-pointer group relative overflow-hidden rounded-xl bg-[#52ca56] px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-black text-sm sm:text-base transition-all duration-700 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_40px_rgba(82,202,86,0.6)]">

                                {/* Shine */}
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[1400ms] group-hover:translate-x-full"></span>

                                <span className="relative flex items-center gap-2">
                                    View My Work
                                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                                        <ArrowRight size={18} />
                                    </span>
                                </span>
                            </button>

                            {/* Contact Me */}
                            <button
                                onClick={handleDownload}
                                className="cursor-pointer group relative overflow-hidden rounded-xl border border-[#52ca56]/40 bg-black px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-white text-sm sm:text-base transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:border-[#52ca56] hover:shadow-[0_0_30px_rgba(82,202,86,0.35)]">

                                {/* Main Wave */}
                                <span className="absolute -left-[150%] top-0 h-full w-[140%] bg-[#52ca56]/20 rounded-r-[100px] transition-all duration-700 ease-out group-hover:left-0"></span>

                                {/* Secondary Wave */}
                                <span className="absolute -left-[160%] top-0 h-full w-[120%] bg-[#52ca56]/10 rounded-r-[80px] transition-all duration-1000 ease-out group-hover:left-[20%]"></span>

                                {/* Glow Wave */}
                                <span className="absolute -left-[170%] top-0 h-full w-[100%] bg-[#52ca56]/5 blur-md transition-all duration-1000 ease-out group-hover:left-[40%]"></span>
                                <div className='flex items-center gap-2'>
                                    <span className="relative z-10 flex items-center gap-2">
                                        C V
                                    </span>
                                    <span className="transition-all duration-300 group-hover:translate-x-1">
                                        <ArrowDownToLine size={16} />
                                    </span>
                                </div>
                            </button>

                        </div>
                    </div>
                    <div className="relative flex items-center justify-center order-1 lg:order-2 lg:mr-16 xl:mr-24 2xl:mr-32 mt-4 lg:mt-0">

                        {/* CENTER HERO */}
                        <div className="relative z-10 flex items-center justify-center">

                            {/* Glow Layer */}
                            <div className="absolute h-[180px] w-[180px] sm:h-[240px] sm:w-[240px] md:h-[280px] md:w-[280px] lg:h-[320px] lg:w-[320px] rounded-full bg-[#52ca56] opacity-25 blur-[70px] sm:blur-[90px] lg:blur-[110px]" />

                            {/* Image */}
                            <Image
                                src="/self.png"
                                alt="hero"
                                width={700}
                                height={700}
                                className="relative z-10 w-[220px] sm:w-[300px] md:w-[380px] lg:w-[480px] xl:w-[560px] 2xl:w-[700px] h-auto -mb-10 sm:-mb-16 md:-mb-24 lg:-mb-32 xl:-mb-45"
                                priority
                            />
                        </div>

                        {/* RIGHT LOGOS (FORCED ABOVE EVERYTHING) */}
                        <div className="hidden md:block">
                            <TechStackCards />
                        </div>
                    </div>
                    {/* Socials */}
                    <div className='fixed right-2 sm:right-4 bottom-24 sm:bottom-28 lg:bottom-35 z-50 flex flex-col gap-3 sm:gap-5 items-center text-xl'>
                        {/* <span>Connsect With Me</span> */}
                        <div className='flex flex-col gap-3 sm:gap-4'>
                            <a href="https://github.com/rathin182" target='_blank'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] cursor-pointer hover:text-[#4eca52] transition-all duration-300"
                                >
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.04c-3.34.72-4.04-1.42-4.04-1.42-.54-1.38-1.34-1.74-1.34-1.74-1.1-.74.08-.72.08-.72 1.2.08 1.84 1.24 1.84 1.24 1.08 1.84 2.82 1.3 3.5.98.1-.78.42-1.3.76-1.6-2.66-.3-5.46-1.34-5.46-5.94 0-1.32.48-2.4 1.24-3.24-.12-.3-.54-1.52.12-3.16 0 0 1.02-.32 3.34 1.24a11.5 11.5 0 0 1 6.08 0c2.32-1.56 3.34-1.24 3.34-1.24.66 1.64.24 2.86.12 3.16.78.84 1.24 1.92 1.24 3.24 0 4.62-2.82 5.62-5.5 5.92.44.38.82 1.12.82 2.28v3.38c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
                                </svg>
                            </a>
                            <a href="https://x.com/RBagchi182" target='_blank'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] cursor-pointer hover:text-[#4eca52] transition-all duration-300 "
                                >
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.153h7.594l5.243 6.932L18.901 1.153zm-1.29 19.494h2.04L6.486 3.24H4.298l13.313 17.407z" />
                                </svg>
                            </a>
                            <a href="mailto:rathinb745@gmail.com">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] cursor-pointer hover:text-[#4eca52] transition-all duration-300 "
                                >
                                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 3.25-8 5.5-8-5.5V6.5l8 5.5 8-5.5v.75z" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/rathin.s_2003/" target='_blank'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] cursor-pointer hover:text-[#4eca52] transition-all duration-300"
                                >
                                    <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm9.75 2a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 17.5 4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </main>

                <div className='z-20 relative'>
                    <TexhStack />
                </div>
            </div>

        </div>
    )
}

export default Hero