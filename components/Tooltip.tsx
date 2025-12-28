import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top', className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);

    const positionStyles = {
        top: { bottom: '100%', left: '50%', x: '-50%', y: -10 },
        bottom: { top: '100%', left: '50%', x: '-50%', y: 10 },
        left: { right: '100%', top: '50%', y: '-50%', x: -10 },
        right: { left: '100%', top: '50%', y: '-50%', x: 10 },
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onFocus={() => setIsVisible(true)}
            onBlur={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, ...positionStyles[position] }}
                        animate={{ opacity: 1, scale: 1, ...positionStyles[position], x: position === 'top' || position === 'bottom' ? '-50%' : positionStyles[position].x, y: position === 'left' || position === 'right' ? '-50%' : positionStyles[position].y }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-50 px-3 py-1.5 whitespace-nowrap rounded-lg backdrop-blur-md bg-black/80 border border-white/10 text-xs font-mono text-[#ff7a22] shadow-[0_4px_20px_rgba(0,0,0,0.5)] pointer-events-none"
                        style={{
                            position: 'absolute',
                            // Fallback absolute positioning handled by motion props but explicitly here for safety
                            ...(position === 'top' ? { bottom: '100%', left: '50%' } : {}),
                            ...(position === 'bottom' ? { top: '100%', left: '50%' } : {}),
                            ...(position === 'left' ? { right: '100%', top: '50%' } : {}),
                            ...(position === 'right' ? { left: '100%', top: '50%' } : {}),
                        }}
                    >
                        <div className="relative z-10">{content}</div>

                        {/* Arrow */}
                        {/* <div className={`absolute w-2 h-2 bg-black/80 border border-white/10 rotate-45 z-0
               ${position === 'top' ? 'bottom-[-5px] left-1/2 -translate-x-1/2 border-t-0 border-l-0' : ''}
               ${position === 'bottom' ? 'top-[-5px] left-1/2 -translate-x-1/2 border-b-0 border-r-0' : ''}
               ${position === 'left' ? 'right-[-5px] top-1/2 -translate-y-1/2 border-b-0 border-l-0' : ''}
               ${position === 'right' ? 'left-[-5px] top-1/2 -translate-y-1/2 border-t-0 border-r-0' : ''}
            `}></div> */}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;
