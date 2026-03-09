"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 8 * position} -${189 + i * 8}C-${
            380 - i * 8 * position
        } -${189 + i * 8} -${312 - i * 8 * position} ${216 - i * 8} ${
            152 - i * 8 * position
        } ${343 - i * 8}C${616 - i * 8 * position} ${470 - i * 8} ${
            684 - i * 8 * position
        } ${875 - i * 8} ${684 - i * 8 * position} ${875 - i * 8}`,
        width: 0.8 + i * 0.06,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <svg className="w-full h-full text-[#c0392b]" viewBox="-100 -300 900 900" fill="none" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.15 + path.id * 0.04}
                        initial={{ pathLength: 0.3, opacity: 0.7 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.4, 0.8, 0.4],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + (path.id * 1.7) % 10,
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
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </div>
    );
}
