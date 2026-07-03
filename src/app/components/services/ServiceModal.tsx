"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type ServiceModalProps = {
  open: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
  } | null;
};

export default function ServiceModal({
  open,
  onClose,
  service,
}: ServiceModalProps) {
  return (
    <AnimatePresence>
      {open && service && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-[9998]
              bg-black/80
              backdrop-blur-md
            "
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 80,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 180,
            }}
            className="
              fixed
              left-1/2
              top-1/2
              z-[9999]
              w-[92vw]
              sm:w-[90vw]
              max-w-5xl
              max-h-[88vh]
              -translate-x-1/2
              -translate-y-1/2
              rounded-2xl
              sm:rounded-3xl
              border
              border-[#52ca56]/20
              bg-[#071018]
              p-5
              sm:p-8
              md:p-10
              overflow-y-auto
              overscroll-contain
            "
          >
            {/* Glow */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[radial-gradient(circle_at_top,#52ca5615,transparent_70%)]
              "
            />

            {/* Close */}
            <button
              onClick={onClose}
              className="
                absolute
                right-4
                top-4
                sm:right-6
                sm:top-6
                text-white/60
                hover:text-white
                z-20
                p-1
              "
              aria-label="Close"
            >
              <X size={22} className="sm:w-6 sm:h-6" />
            </button>

            <div className="relative z-10 pr-6 sm:pr-0">
              <p className="text-[#52ca56] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-3 sm:mb-4">
                Service
              </p>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {service.title}
              </h2>

              <p className="text-white/70 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 mb-6 sm:mb-8 md:mb-10">
                {service.description}
              </p>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                    What You Get
                  </h3>

                  <ul className="space-y-2 sm:space-y-3 text-white/60 text-sm sm:text-base">
                    <li>✓ Architecture Design</li>
                    <li>✓ Production Ready Code</li>
                    <li>✓ Security Best Practices</li>
                    <li>✓ Performance Optimization</li>
                    <li>✓ Documentation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                    Technologies
                  </h3>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {[
                      "Next.js",
                      "TypeScript",
                      "Node.js",
                      "PostgreSQL",
                      "Docker",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="
                          rounded-full
                          border
                          border-[#52ca56]/20
                          px-3
                          py-1.5
                          sm:px-4
                          sm:py-2
                          text-xs
                          sm:text-sm
                          text-white
                        "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}