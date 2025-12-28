import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParticleCanvasProps {
    variant: 'snow' | 'embers' | 'digital';
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ variant }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const particleCount = 150;
        const particles: any[] = [];

        // Colors & Config based on variant
        const config = {
            snow: {
                colors: ['#ffffff', '#e0f7fa'],
                speedY: [1, 3], // Falling down
                speedX: [-0.5, 0.5],
                size: [1, 3],
                opacity: [0.3, 0.8]
            },
            embers: {
                colors: ['#ff7a22', '#fbbf24', '#ff4d00'],
                speedY: [-0.5, -2], // Floating up
                speedX: [-0.3, 0.3],
                size: [2, 5],
                opacity: [0.4, 0.9]
            },
            digital: {
                colors: ['#00ff00', '#ccffcc'],
                speedY: [2, 5],
                speedX: [0, 0],
                size: [1, 2],
                opacity: [0.5, 1]
            }
        }[variant];

        const initParticles = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: config.speedX[0] + Math.random() * (config.speedX[1] - config.speedX[0]),
                    vy: config.speedY[0] + Math.random() * (config.speedY[1] - config.speedY[0]),
                    size: config.size[0] + Math.random() * (config.size[1] - config.size[0]),
                    color: config.colors[Math.floor(Math.random() * config.colors.length)],
                    life: Math.random(),
                    decay: 0.005 + Math.random() * 0.01
                });
            }
        };

        let animationId: number;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Transparent clear

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.decay;

                // Wrap around
                if (p.y > canvas.height) p.y = -10;
                if (p.y < -10) p.y = canvas.height;
                if (p.x > canvas.width) p.x = 0;
                if (p.x < 0) p.x = canvas.width;
                if (p.life <= 0) p.life = 1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life * config.opacity[1];
                ctx.fill();
                ctx.globalAlpha = 1;
            }
            animationId = requestAnimationFrame(render);
        };

        ScrollTrigger.create({
            trigger: canvas,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => {
                initParticles();
                render();
            },
            onLeave: () => cancelAnimationFrame(animationId),
            onEnterBack: () => render(),
            onLeaveBack: () => cancelAnimationFrame(animationId)
        });

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [variant]);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 mix-blend-screen" />;
};

export default ParticleCanvas;
