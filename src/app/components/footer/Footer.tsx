"use client";

import { useState } from "react";
import {
    Mail,
    Camera,
    Code2,
    LayoutGrid,
    Server,
    Slash,
    ShieldCheck,
    Settings2,
    Send,
    Phone,
    MapPin,
    ArrowRight,
    Heart,
    ChevronsRight,
} from "lucide-react";
import Image from "next/image";
import HeroBackground from "../animation/HeroBackground";
import { toast } from "sonner";

// ─── Scattered Background Dots ─────────────────────────────────────────────
// Fixed positions (not random) so the layout is stable across renders.
const DOTS = [
    { top: "4%", left: "11%", size: 3, opacity: 0.5 },
    { top: "2%", left: "20%", size: 2, opacity: 0.4 },
    { top: "6%", left: "44%", size: 2, opacity: 0.35 },
    { top: "3%", left: "61%", size: 2, opacity: 0.4 },
    { top: "8%", left: "73%", size: 3, opacity: 0.5 },
    { top: "2%", left: "85%", size: 2, opacity: 0.35 },
    { top: "9%", left: "94%", size: 4, opacity: 0.6 },
    { top: "16%", left: "31%", size: 2, opacity: 0.3 },
    { top: "22%", left: "56%", size: 2, opacity: 0.3 },
    { top: "21%", left: "94%", size: 2, opacity: 0.4 },
    { top: "30%", left: "37%", size: 2, opacity: 0.3 },
    { top: "33%", left: "73%", size: 2, opacity: 0.3 },
    { top: "38%", left: "53%", size: 2, opacity: 0.3 },
    { top: "44%", left: "32%", size: 2, opacity: 0.3 },
    { top: "47%", left: "59%", size: 2, opacity: 0.3 },
    { top: "55%", left: "23%", size: 2, opacity: 0.3 },
    { top: "58%", left: "70%", size: 2, opacity: 0.35 },
    { top: "62%", left: "47%", size: 2, opacity: 0.3 },
    { top: "68%", left: "8%", size: 2, opacity: 0.3 },
    { top: "70%", left: "88%", size: 2, opacity: 0.3 },
    { top: "76%", left: "35%", size: 2, opacity: 0.3 },
    { top: "80%", left: "62%", size: 2, opacity: 0.3 },
];

const GithubIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-[17px] w-[17px]"
    >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.04c-3.34.72-4.04-1.42-4.04-1.42-.54-1.38-1.34-1.74-1.34-1.74-1.1-.74.08-.72.08-.72 1.2.08 1.84 1.24 1.84 1.24 1.08 1.84 2.82 1.3 3.5.98.1-.78.42-1.3.76-1.6-2.66-.3-5.46-1.34-5.46-5.94 0-1.32.48-2.4 1.24-3.24-.12-.3-.54-1.52.12-3.16 0 0 1.02-.32 3.34 1.24a11.5 11.5 0 0 1 6.08 0c2.32-1.56 3.34-1.24 3.34-1.24.66 1.64.24 2.86.12 3.16.78.84 1.24 1.92 1.24 3.24 0 4.62-2.82 5.62-5.5 5.92.44.38.82 1.12.82 2.28v3.38c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
);

const XIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-[17px] w-[17px]"
    >
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.153h7.594l5.243 6.932L18.901 1.153zm-1.29 19.494h2.04L6.486 3.24H4.298l13.313 17.407z" />
    </svg>
);

const InstaIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[25px] h-[25px] cursor-pointer hover:text-[#4eca52] transition-all duration-300"
    >
        <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm9.75 2a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 17.5 4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
);


// ─── Data ───────────────────────────────────────────────────────────────────
const quickLinks = [
    {
        label: "Home",
        href: "home",
    },
    {
        label: "About Me",
        href: "about",
    },
    {
        label: "Projects",
        href: "projects",
    },
    {
        label: "Services",
        href: "services",
    },
    {
        label: "Skills",
        href: "home",
    },
];

const services = [
    { label: "Web Development", icon: Code2 },
    { label: "Frontend Development", icon: LayoutGrid },
    { label: "Backend Development", icon: Server },
    { label: "API Development", icon: Slash },
    { label: "Database Management", icon: ShieldCheck },
    { label: "Maintenance & Support", icon: Settings2 },
];

const connectItems = [
    { label: "Let's build something great together", icon: Send },
    { label: "rathinbagchii@gmail.com", icon: Mail },
    { label: "+91 (914) 741-4203", icon: Phone },
    { label: "Available for remote work", icon: MapPin },
];

export const socials = [
    {
        href: "https://github.com/rathin182",
        Icon: GithubIcon,
    },
    {
        href: "https://x.com/RBagchi182",
        Icon: XIcon,
    },
    {
        href: "mailto:rathinbagchii@gmail.com",
        Icon: Mail,
    },
    {
        href: "https://www.instagram.com/rathin.s_2003",
        Icon: InstaIcon,
    },
];

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleEmailChange = async (e: any) => {
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(email),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Failed to send message.");
            }
            toast.success(data.message || "Message sent successfully!");

            // Reset form
            setEmail("");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        }
    };

    const scrollToProjects = (link: any) => {

        document.getElementById(`${link}`)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <footer className="relative w-full">

            <div
                className="
          relative
          max-w-full
          border
          border-[#143420]
          bg-[#02070B]
        "
            >
                <HeroBackground />
                {/* ===== Glowing top border line ===== */}
                <div
                    className="absolute left-0 top-0 h-[2px] w-full"
                    style={{
                        background:
                            "linear-gradient(to right, transparent 5%, #3CFF73 50%, transparent 95%)",
                        boxShadow: "0 0 20px 1px rgba(60,255,115,0.6)",
                    }}
                />

                {/* ===== Scattered starfield dots ===== */}
                <div className="pointer-events-none absolute inset-0">
                    {DOTS.map((dot, i) => (
                        <span
                            key={i}
                            className="absolute rounded-full bg-[#3CFF73]"
                            style={{
                                top: dot.top,
                                left: dot.left,
                                width: dot.size,
                                height: dot.size,
                                opacity: dot.opacity,
                            }}
                        />
                    ))}
                </div>

                {/* ===== Main grid ===== */}
                <div className="relative z-10 grid grid-cols-1 gap-12 px-8 py-14 sm:px-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-8">
                    {/* ───────── Column 1: Brand / Bio / Socials / Newsletter ───────── */}
                    <div>
                        {/* Logo */}
                        <div
                            className="text-[48px] font-black italic leading-none tracking-tight text-transparent"
                            style={{
                                WebkitTextStroke: "1.5px #3CFF73",
                                filter: "drop-shadow(0 0 10px rgba(60,255,115,0.45))",
                            }}
                        >
                            <Image src="/logonobg2.png" alt="Vercel Logo" width={40} height={30} />
                        </div>

                        {/* Bio */}
                        <p className="mt-5 max-w-[300px] text-[15px] leading-7 text-white/55">
                            Full Stack Developer building scalable web applications and
                            digital experiences that make an impact.
                        </p>

                        {/* Social icons */}
                        <div className="mt-6 flex items-center gap-3">
                            {socials.map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" flex h-10 w-10 items-center justify-center rounded-full border border-[#3CFF73]/30 text-[#3CFF73] transition-all duration-300 hover:bg-[#3CFF73]/10 hover:text-[#4eca52] hover:shadow-[0_0_18px_rgba(60,255,115,.35)]">
                                    <Icon size={17} strokeWidth={2} />
                                </a>
                            ))}
                        </div>

                        {/* Stay Updated */}
                        {/* <div className="mt-9">
                            <div className="flex items-center gap-2.5">
                                <Mail size={17} className="text-[#3CFF73]" />
                                <span className="text-[15px] font-semibold text-white">
                                    Stay Updated
                                </span>
                            </div>

                            <p className="mt-3 max-w-[300px] text-[14px] leading-6 text-white/45">
                                Get the latest updates on projects, articles and tech
                                insights.
                            </p>

                            <div className="mt-4 flex max-w-[340px] items-center gap-2.5">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className=" w-full rounded-lg border border-white/10 bg-[#0a1410] px-4 py-3 text-[13px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-[#3CFF73]/40 " />
                                <button
                                onClick={handleEmailChange}
                                    className=" flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-lg bg-[#3CFF73] text-[#04100a] shadow-[0_0_18px_rgba(60,255,115,0.35)] transition-transform hover:scale-105 " >
                                    <ArrowRight size={17} />
                                </button>
                            </div>
                        </div> */}
                    </div>

                    {/* ───────── Column 2: Quick Links ───────── */}
                    <div className="border-l border-white/[0.06] pl-8 lg:pl-10">
                        <h4 className="text-[13px] font-bold uppercase tracking-[0.25em] text-[#3CFF73]">
                            Quick Links
                        </h4>

                        <div className="mt-3 h-px w-[150px] bg-gradient-to-r from-[#3CFF73] via-[#3CFF73]/20 to-transparent" />

                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => scrollToProjects(link.href)}
                                        className=" group flex items-center gap-2 text-[15px] text-white/70 transition-all duration-300 hover:text-[#3CFF73] " >
                                        <ChevronsRight
                                            size={15}
                                            className=" text-[#3CFF73] transition-transform duration-300 group-hover:translate-x-1 "
                                        />
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ───────── Column 3: Services ───────── */}
                    <div className="border-l border-white/[0.06] pl-8 lg:pl-10">
                        <h4 className="text-[13px] font-bold uppercase tracking-[0.25em] text-[#3CFF73]">
                            Services
                        </h4>

                        <div className="mt-3 h-px w-[150px] bg-gradient-to-r from-[#3CFF73] via-[#3CFF73]/20 to-transparent" />

                        <ul className="mt-7 space-y-4">
                            {services.map(({ label, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href="#"
                                        className=" flex items-center gap-3 text-[15px] text-white/70 transition-colors hover:text-[#3CFF73] " >
                                        <Icon size={16} className="text-[#3CFF73]" />
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ───────── Column 4: Let's Connect ───────── */}
                    <div className="relative border-l border-white/[0.06] pl-8 lg:pl-10">
                        <h4 className="text-[13px] font-bold uppercase tracking-[0.25em] text-[#3CFF73]">
                            Let&apos;s Connect
                        </h4>

                        <div className="mt-3 h-px w-[150px] bg-gradient-to-r from-[#3CFF73] via-[#3CFF73]/20 to-transparent" />

                        <div className="mt-7 flex flex-col gap-3.5">
                            {connectItems.map(({ label, icon: Icon }) => (
                                <div
                                    key={label}
                                    className=" flex items-center gap-3 rounded-xl border border-[#3CFF73]/15 bg-[#3CFF73]/[0.03] px-4 py-3 " >
                                    <Icon size={15} className="flex-shrink-0 text-[#3CFF73]" />
                                    <span className="text-[13.5px] text-white/75">{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Paper plane + dashed swirl decoration */}
                        <div className="pointer-events-none absolute -bottom-3 right-0 h-[140px] w-[220px] overflow-visible">
                            <svg
                                viewBox="0 0 220 140"
                                className="absolute inset-0 h-full w-full"
                                fill="none"
                            >
                                <path
                                    d="M0 120
                     C 30 130, 35 95, 65 90
                     C 95 85, 90 55, 65 55
                     C 40 55, 38 80, 60 90
                     C 90 104, 130 95, 160 75"
                                    stroke="#3CFF73"
                                    strokeOpacity="0.65"
                                    strokeWidth="2"
                                    strokeDasharray="6 7"
                                    strokeLinecap="round"
                                />
                            </svg>

                            <div className="absolute right-1 top-2 rotate-[18deg] drop-shadow-[0_8px_18px_rgba(60,255,115,0.45)]">
                                <Image
                                    width={90}
                                    height={90}
                                    src="/paperplane.png"
                                    alt="paper-plane"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== Bottom bar ===== */}
                <div className="relative z-10 border-t border-white/[0.06] px-8 py-6 sm:px-12">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="flex items-center gap-2 text-[13.5px] text-white/45">
                            © 2025 Rathin Bagchi Developer. All rights reserved.
                            <Heart size={13} className="fill-[#3CFF73] text-[#3CFF73]" />
                            Built with passion and code.
                        </p>

                        <div className="flex items-center gap-3 text-[13.5px] text-white/45">
                            <a href="#" className="transition-colors hover:text-[#3CFF73]">
                                Privacy Policy
                            </a>
                            <span className="text-white/20">|</span>
                            <a href="#" className="transition-colors hover:text-[#3CFF73]">
                                Terms of Service
                            </a>
                            <span className="text-white/20">|</span>
                            <a href="#" className="transition-colors hover:text-[#3CFF73]">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}