"use client";

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HoverLightEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  borderRadius?: string;
}

export function HoverLightEffect({ children, className, borderRadius = '0.75rem' }: HoverLightEffectProps) {
  return (
    <div
      style={{ borderRadius }}
      className={cn(
        "relative overflow-hidden group transition-all duration-300",
        "hover:shadow-[0_0_15px_2px_hsl(var(--accent)/0.4)]",
        className
      )}
    >
      <div className="h-full w-full" style={{ borderRadius }}>
        {children}
      </div>
    </div>
  );
}
