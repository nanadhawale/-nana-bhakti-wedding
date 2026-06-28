"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaMusic, FaFire, FaLeaf } from "react-icons/fa";

interface EventCardProps {
  title: string;
  subtitle: string;
  date: string;
  location: string;
  iconType: "leaf" | "music" | "fire";
  isMain?: boolean;
  delay?: number;
}

export default function EventCard({ title, subtitle, date, location, iconType, isMain = false, delay = 0 }: EventCardProps) {
  
  const renderIcon = () => {
    switch(iconType) {
      case "leaf": return <FaLeaf className={isMain ? "text-gold" : "text-maroon"} />;
      case "music": return <FaMusic className={isMain ? "text-gold" : "text-maroon"} />;
      case "fire": return <FaFire className={isMain ? "text-gold" : "text-maroon"} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`flex flex-col items-center text-center p-8 transition-transform duration-300 hover:-translate-y-2 
        ${isMain 
          ? 'bg-white border border-maroon shadow-2xl z-10 scale-105' 
          : 'bg-white/60 border border-white wedding-shadow'
        }`}
    >
      {/* Icon Box */}
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-6 
        ${isMain ? 'bg-maroon' : 'bg-gold'}`}>
        {renderIcon()}
      </div>
      
      {/* Date */}
      <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gold uppercase mb-3">
        {date}
      </p>

      {/* Title */}
      <h3 className={`text-3xl md:text-4xl font-bold mb-2 ${isMain ? 'text-maroon' : 'text-[#4a332f]'}`}>
        {title}
      </h3>
      
      {/* Subtitle (Marathi) */}
      <p className="text-sm md:text-base text-[#7c6662] mb-8 font-medium">
        {subtitle}
      </p>

      <div className="mt-auto w-full">
        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-[#7c6662] mb-6 border-t border-black/5 pt-6">
          <FaMapMarkerAlt className="text-maroon flex-shrink-0" />
          <span className="text-left leading-tight">{location}</span>
        </div>
        
        {/* Button */}
        <a 
          href="https://maps.google.com" 
          target="_blank"
          className="block w-full bg-maroon text-white text-[10px] md:text-xs font-bold tracking-widest uppercase py-4 rounded-sm hover:bg-[#4a0d0d] transition-colors"
        >
          View on Map ↗
        </a>
      </div>
    </motion.div>
  );
}
