"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import CardExplosionScene from "./CardExplosionScene";
import ShatteredCard from "./ShatteredCard";

export default function CrackedCard({ children, onExplode, }: { children: React.ReactNode; onExplode?: () => void; }) {
    const [cracked, setCracked] = useState(false);
    const [explode, setExplode] = useState(false);

    useEffect(() => {
        if (!explode) return;

        const timer = setTimeout(() => {
            setExplode(false);
            setCracked(false);
        }, 6000);

        return () => clearTimeout(timer);
    }, [explode]);

    return (
        <motion.div
            layout
            onClick={() => {
                if (cracked) return;

                setCracked(true);

                setTimeout(() => {
                    setExplode(true);

                    onExplode?.();
                }, 1200);
            }}
            className=" relative overflow-hidden rounded-3xl cursor-pointer " >
            {/* Base Card */}
            <motion.div
                animate={{
                    opacity: explode ? 0 : 1,
                    scale: explode ? 0.95 : 1,
                }}
                transition={{
                    duration: 0.3,
                }}
            >
                {children}
            </motion.div>

            <AnimatePresence>
                {cracked && (
                    <>
                        {/* Green Core Glow */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            className=" " />

                        {/* Crack 1 */}
                        <motion.div
                            initial={{
                                scaleY: 0,
                            }}
                            animate={{
                                scaleY: 1,
                            }}
                            transition={{
                                duration: 0.4,
                            }}
                            className=" " />

                        {/* Crack 2 */}
                        <motion.div
                            initial={{
                                scaleY: 0,
                            }}
                            animate={{
                                scaleY: 1,
                            }}
                            transition={{
                                delay: 0.1,
                                duration: 0.4,
                            }}
                            className=" " />

                        {/* Crack Branch */}
                        <motion.div
                            initial={{
                                scaleX: 0,
                            }}
                            animate={{
                                scaleX: 1,
                            }}
                            transition={{
                                delay: 0.2,
                            }}
                            className="" />

                        {/* Energy Pulse */}
                        <motion.div
                            animate={{
                                opacity: [
                                    0.3,
                                    1,
                                    0.3,
                                ],
                                scale: [
                                    1,
                                    1.15,
                                    1,
                                ],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                            }}
                            className=" absolute inset-0 rounded-3xl border border-[#52ca56] " />
                    </>
                )}
            </AnimatePresence>
            {explode && (
                <ShatteredCard>
                    {children}
                </ShatteredCard>
            )}
        </motion.div>
    );
}