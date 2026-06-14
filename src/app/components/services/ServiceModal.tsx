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
              w-[90vw]
              max-w-5xl
              -translate-x-1/2
              -translate-y-1/2
              rounded-3xl
              border
              border-[#52ca56]/20
              bg-[#071018]
              p-10
              overflow-hidden
            "
          >
            {/* Glow */}
            <div
              className="
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
                right-6
                top-6
                text-white/60
                hover:text-white
              "
            >
              <X />
            </button>

            <div className="relative z-10">
              <p className="text-[#52ca56] uppercase tracking-[0.3em] text-sm mb-4">
                Service
              </p>

              <h2 className="text-5xl font-bold text-white mb-6">
                {service.title}
              </h2>

              <p className="text-white/70 text-lg leading-8 mb-10">
                {service.description}
              </p>

              {/* Content Grid */}
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    What You Get
                  </h3>

                  <ul className="space-y-3 text-white/60">
                    <li>✓ Architecture Design</li>
                    <li>✓ Production Ready Code</li>
                    <li>✓ Security Best Practices</li>
                    <li>✓ Performance Optimization</li>
                    <li>✓ Documentation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Technologies
                  </h3>

                  <div className="flex flex-wrap gap-3">
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
                          px-4
                          py-2
                          text-sm
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