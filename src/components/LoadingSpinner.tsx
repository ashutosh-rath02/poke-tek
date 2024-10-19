import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-20">
    <motion.div
      className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default LoadingSpinner;
