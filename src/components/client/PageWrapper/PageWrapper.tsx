"use client";

import { motion } from "framer-motion";

export default function PageWrapper({ children, ...rest }: React.ComponentProps<typeof motion.main>) {
  return (
    <motion.main
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
      {...rest}
    >
      {children}
    </motion.main>
  );
}
