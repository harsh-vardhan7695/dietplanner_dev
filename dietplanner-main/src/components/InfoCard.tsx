
import React from 'react';
import { cn } from "@/lib/utils";

interface InfoCardProps {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ 
  children, 
  className,
  highlight = false
}) => {
  return (
    <div className={cn(
      "animate-scale-in rounded-2xl border p-6 shadow-sm glass-effect",
      highlight ? "bg-white/90 border-blue-100" : "bg-white/80 border-white/30",
      className
    )}>
      {children}
    </div>
  );
};

export default InfoCard;
