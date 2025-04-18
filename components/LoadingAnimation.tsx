"use client";

import { motion } from 'framer-motion';

export const LoadingAnimation = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#191919]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Classic spinner with gradient */}
        <motion.div
          className="w-16 h-16 border-t-4 border-l-4 border-r-4 border-b-4 border-b-transparent rounded-full"
          style={{ 
            borderTopColor: '#ff3d00',
            borderLeftColor: '#b27aff',
            borderRightColor: '#5badff',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Üç nokta animasyonu kaldırıldı */}
      </motion.div>
    </motion.div>
  );
};