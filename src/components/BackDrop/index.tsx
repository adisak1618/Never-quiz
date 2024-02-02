"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const Backdrop = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <motion.div
      onClick={onClick}
      className="backdrop fixed w-full h-full bg-gray-600/50 top-0 left-0 !m-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
