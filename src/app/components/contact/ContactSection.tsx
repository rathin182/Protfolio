"use client";

import { useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import GlowButton from "@/app/components/about/GlowButton";
import HeroBackground from "../animation/HeroBackground";
import { toast } from "sonner";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [planeKey, setPlaneKey] = useState(0);
  const [signalActive, setSignalActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real on-screen positions of the button and the plane, measured relative
  // to the card, so the rope path always connects them accurately.
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  const measure = () => {
    const cardRect = cardRef.current?.getBoundingClientRect();
    const btnRect = buttonWrapperRef.current?.getBoundingClientRect();
    const planeRect = planeRef.current?.getBoundingClientRect();
    if (!cardRect || !btnRect || !planeRect) return;

    setPoints({
      x1: btnRect.left - cardRect.left + btnRect.width / 2,
      y1: btnRect.top - cardRect.top + btnRect.height / 2,
      x2: planeRect.left - cardRect.left + planeRect.width / 2,
      y2: planeRect.top - cardRect.top + planeRect.height / 2,
    });
  };

  // Measure once layout has settled, and again on resize.
  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (isSending) return;

    try {
      setIsSending(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to send message.");
      }
      toast.success(data.message || "Message sent successfully!");

      // Reset form
      setForm({
        name: "",
        email: "",
        message: "",
      });

      // Refresh rope positions
      measure();

      if (isSubmitting) return;

      setIsSubmitting(true);

      // Start signal animation
      setSignalActive(true);

      // Pause plane until signal reaches it
      setIsSending(false);

      // Signal reaches plane
      setTimeout(() => {
        setSignalActive(false);
        setIsSending(true);
      }, 650);

      // Reset animation
      setTimeout(() => {
        setIsSending(false);
        setPlaneKey((k) => k + 1);
      }, 1850);
    } catch (error) {
      setIsSubmitting(false);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

      setIsSending(false);
      setSignalActive(false);
    }finally{
      setIsSubmitting(false);
    }
  };

  // Curvy path from the button (start) up to the plane (end), echoing the
  // loop-and-swoop shape from the reference image. Built with a couple of
  // cubic-bezier control points so it isn't just a straight line.
  const pathD = `
    M ${points.x1} ${points.y1}
    C ${points.x1 + 40} ${points.y1 - 120},
      ${points.x1 - 60} ${points.y1 - 200},
      ${points.x1 + 30} ${points.y1 - 230}
    C ${points.x1 + 120} ${points.y1 - 260},
      ${(points.x1 + points.x2) / 2} ${points.y1 - 160},
      ${points.x2} ${points.y2}
  `;

  return (
    <div
      id="contact"
      ref={cardRef}
      className="
        relative
        flex
        w-full
        max-w-7xl
        h-screen
        overflow-hidden
        bg-[#02070B]
      "
    >
      <HeroBackground />

      {/* ===== Rope path connecting the button to the plane ===== */}
      <svg
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        style={{ overflow: "visible" }}
      >
        {/* Resting dashed rope — always visible, faint */}
        <path
          d={pathD}
          fill="none"
          stroke="#3CFF73"
          strokeOpacity={0.35}
          strokeWidth={2}
          strokeDasharray="8 8"
          strokeLinecap="round"
        />

        {/* Traveling signal — a brighter dash pattern animating along the same path */}
        <AnimatePresence>
          {signalActive && (
            <motion.path
              d={pathD}
              fill="none"
              stroke="#9CFFC2"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="14 220"
              initial={{ strokeDashoffset: 0, opacity: 1 }}
              animate={{ strokeDashoffset: -234, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeIn" }}
              style={{
                filter: "drop-shadow(0 0 6px #3CFF73)",
              }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* LEFT */}
      <div className="relative z-20 flex w-1/2 flex-col justify-center px-14 py-12">
        {/* Small Title */}
        <span
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.35em]
            text-[#3CFF73]
          "
        >
          LET'S CONNECT
        </span>

        {/* Heading */}
        <h2
          className="
            mt-3
            text-4xl
            font-bold
            text-white
          "
        >
          Let's Build Something Great
        </h2>

        {/* Description */}
        <p
          className="
            mt-4
            max-w-md
            text-[15px]
            leading-7
            text-white/55
          "
        >
          Have a project in mind or want to collaborate?
          I'm always open to discussing new opportunities.
        </p>

        {/* Form */}
        <div className="mt-8 flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="
              w-full
              rounded-xl
              border
              border-white/[0.06]
              bg-[#0b1410]
              px-5
              py-3.5
              text-[14px]
              text-white
              placeholder:text-white/35
              outline-none
              transition-colors
              focus:border-[#3CFF73]/40
            "
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="
              w-full
              rounded-xl
              border
              border-white/[0.06]
              bg-[#0b1410]
              px-5
              py-3.5
              text-[14px]
              text-white
              placeholder:text-white/35
              outline-none
              transition-colors
              focus:border-[#3CFF73]/40
            "
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={4}
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-white/[0.06]
              bg-[#0b1410]
              px-5
              py-3.5
              text-[14px]
              text-white
              placeholder:text-white/35
              outline-none
              transition-colors
              focus:border-[#3CFF73]/40
            "
          />
        </div>

        {/* Button */}
        <div ref={buttonWrapperRef} className="mt-7 inline-block w-fit">
          <motion.div
            animate={
              signalActive
                ? {
                  scale: [1, 1.1, 0.96, 1],
                  transition: { duration: 0.4, ease: "easeOut" },
                }
                : { scale: 1 }
            }
          >
            <GlowButton onClick={handleSubmit}>
              {signalActive || isSending ? "Sending..." : "Send Message"}
            </GlowButton>
          </motion.div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative z-20 flex w-1/2 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSending && (
            <motion.div
              key={`plane-rest-${planeKey}`}
              ref={planeRef}
              initial={{ opacity: 0, scale: 0.2, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1], // springy pop-in
              }}
              // Re-measure once the resting plane has mounted/settled
              onAnimationComplete={measure}
            >
              <Image
                width={200}
                height={200}
                src="/paperplane.png"
                alt="paper-plane"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle pulse on the plane right as the signal arrives */}
        <AnimatePresence>
          {signalActive && (
            <motion.div
              key={`plane-pulse-${planeKey}`}
              className="absolute h-28 w-28 rounded-full bg-[#3CFF73]/25 blur-2xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.3, 1.5] }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSending && (
            <motion.div
              key={`plane-flight-${planeKey}`}
              className="absolute"
              initial={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [1, 1, 0],
                scale: [1, 1.15, 0.5],
                x: [0, 40, 480],
                y: [0, -20, -340],
                rotate: [0, -6, 18],
              }}
              transition={{
                duration: 1.1,
                ease: "easeIn",
                times: [0, 0.25, 1],
              }}
            >
              <Image
                width={200}
                height={200}
                src="/paperplane.png"
                alt="paper-plane"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Launch glow burst behind the plane */}
        <AnimatePresence>
          {isSending && (
            <motion.div
              key={`glow-${planeKey}`}
              className="absolute h-40 w-40 rounded-full bg-[#3CFF73]/30 blur-3xl"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.4, 1.3, 1.6] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Border Glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
      />
    </div>
  );
}