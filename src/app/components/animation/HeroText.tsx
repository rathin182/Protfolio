"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

const titles = [
  {
    text: "Web Applications",
    animation: "slide",
  },
  {
    text: "SaaS Products",
    animation: "typing",
  },
  {
    text: "AI Solutions",
    animation: "transform",
  },
  {
    text: "Developer Platforms",
    animation: "slide",
  },
  {
    text: "Modern Experiences",
    animation: "transform",
  },
];


function TypingText({
  text,
}: {
  text: string;
}) {
  const [displayed, setDisplayed] =
    useState("");

  useEffect(() => {
    setDisplayed("");

    let i = 0;

    const interval = setInterval(() => {
      i++;

      setDisplayed(text.slice(0, i));

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="text-6xl font-semibold text-[#4eca52] tracking-tight">
      {displayed}
      <motion.span
        animate={{
          opacity: [1, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
        }}
      >
        |
      </motion.span>
    </span>
  );
}

function TransformText({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    let step = 0;

    const maxLength = Math.max(
      from.length,
      to.length
    );

    const interval = setInterval(() => {
      step++;

      const leftPart = from.slice(
        0,
        Math.max(0, from.length - step)
      );

      const rightPart = to.slice(
        Math.max(0, to.length - step)
      );

      setDisplay(leftPart + rightPart);

      if (step > maxLength) {
        setDisplay(to);
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [from, to]);

  return (
    <span className="text-6xl font-semibold text-[#4eca52] tracking-tight">
      {display}
    </span>
  );
}

function MorphText({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex">
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{
            opacity: 0,
            y: 10,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            delay: i * 0.03,
            duration: 0.4,
          }}
          className="text-6xl font-semibold text-[#4eca52] tracking-tight"
        >
          {char === " "
            ? "\u00A0"
            : char}
        </motion.span>
      ))}
    </div>
  );
}

export default function HeroText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(
        (prev) =>
          (prev + 1) % titles.length
      );
    }, 3500);

    return () =>
      clearInterval(interval);
  }, []);

  const current = useMemo(
    () => titles[index],
    [index]
  );

  return (
    <div className="flex flex-col gap-2">
      {/* TOP */}
      <span
        style={{
          fontFamily:
            "var(--font-playfair)",
        }}
        className="
          text-6xl
          font-semibold
          tracking-tight
        "
      >
        I Build Scalable
      </span>

      {/* CENTER */}
      <div className="relative h-[90px] overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Slide Animation */}
          {current.animation ===
            "slide" && (
              <motion.div
                key={current.text}
                initial={{
                  y: 60,
                  opacity: 0,
                  filter:
                    "blur(12px)",
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  filter:
                    "blur(0px)",
                }}
                exit={{
                  y: -60,
                  opacity: 0,
                  filter:
                    "blur(12px)",
                }}
                transition={{
                  duration: 0.7,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                absolute
                left-0
                top-0
              "
              >
                <span
                  className="
                  text-6xl
                  font-semibold
                  text-[#4eca52]
                  tracking-tight
                "
                >
                  {current.text}
                </span>
              </motion.div>
            )}

          {/* Typing Animation */}
          {current.animation ===
            "typing" && (
              <motion.div
                key={current.text}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="
                absolute
                left-0
                top-0
              "
              >
                <TypingText
                  text={current.text}
                />
              </motion.div>
            )}

          {/* Morph Animation */}
          {current.animation ===
            "transform" && (
              <motion.div
                key={current.text}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="
      absolute
      left-0
      top-0
    "
              >
                <TransformText
                  from={
                    titles[
                      index === 0
                        ? titles.length - 1
                        : index - 1
                    ].text
                  }
                  to={current.text}
                />
              </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* BOTTOM */}
      <span
        style={{
          fontFamily:
            "var(--font-playfair)",
        }}
        className="
          text-6xl
          font-semibold
          tracking-tight
        "
      >
        That Solve Real Problems
      </span>
    </div>
  );
}