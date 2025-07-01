// components/FadeInOnScroll.jsx
"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function FadeInOnScroll({ children }) {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
            });
        } else {
            controls.start({
                opacity: 0,
                y: 50,
                transition: { duration: 0.5 },
            });
        }
    }, [inView]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
        >
            {children}
        </motion.div>
    );
}
