"use client";

import { motion } from "framer-motion";

export default function PageWrapper({ children, ...rest }: React.ComponentProps<typeof motion.main>) {
  return (
    <motion.main initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} {...rest}>
      {children}
    </motion.main>
  );
}
