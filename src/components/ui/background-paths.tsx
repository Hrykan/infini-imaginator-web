"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 7 * position} -${189 + i * 7}C-${
            380 - i * 7 * position
        } -${189 + i * 7} -${312 - i * 7 * position} ${216 - i * 7} ${
            152 - i * 7 * position
        } ${343 - i * 7}C${616 - i * 7 * position} ${470 - i * 7} ${
            684 - i * 7 * position
        } ${875 - i * 7} ${684 - i * 7 * position} ${875 - i * 7}`,
        width: 0.6 + i * 0.05,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <svg
                className="w-full h-full text-[#c0392b]"
                viewBox="-100 -350 900 1000"
                fill="none"
                preserveAspectRatio="xMidYMin slice"
                aria-hidden="true"
            >
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.25 + path.id * 0.028}
                        initial={{ pathLength: 0.3, opacity: 0.8 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.5, 0.9, 0.5],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 18 + (path.id * 1.5) % 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths() {
    return (
        <div className="absolute -top-80 inset-x-0 bottom-0 overflow-hidden" aria-hidden="true">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </div>
    );
}
