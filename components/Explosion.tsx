import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Explosion: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize canvas
        const resize = () => {
            canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Particle System
        // Reduced count slightly to keep performance high with larger draw calls
        const particleCount = 1500;
        const particles: { x: number; y: number; vx: number; vy: number; life: number; size: number; color: string; rotation: number; vrot: number }[] = [];

        const colors = ['#ff7a22', '#ffffff', '#fbbf24', '#ff4d00'];

        // Init Particles (Center start)
        const createExplosion = () => {
            particles.length = 0;
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                // Game-like physics: explosive initial velocity
                const speed = Math.random() * 25 + 5;

                particles.push({
                    x: cx,
                    y: cy,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1.0,
                    // Much larger size to match "Experience" blocks (approx 10-40px)
                    size: Math.random() * 30 + 10,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    rotation: Math.random() * Math.PI * 2,
                    vrot: (Math.random() - 0.5) * 0.2
                });
            }
        };

        let animationId: number;
        const render = () => {
            // Create trails/motion blur effect by fading instead of clearing completely
            ctx.fillStyle = 'rgba(0,0,0,0.2)'; // Clears previous frame with slight transparency
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Actually, for a clean UI overlay, clearRect is usually better, but trails look "game-like".
            // Let's stick to clearRect for crispness on top of the dark UI, 
            // or use clearRect if we want transparency.
            // User asked for "smooth like in a game". 
            // Often games uses Additive Blending.
            ctx.globalCompositeOperation = 'lighter';
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.vrot;

                // Physics updates
                p.life -= 0.005 + Math.random() * 0.01; // Slower decay for longer hanging time
                p.vx *= 0.92; // Heavy Air Friction for "impact" feel
                p.vy *= 0.92;
                p.vy += 0.5; // Gravity

                if (p.life > 0) {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);

                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.life;

                    // Draw Rounded Rects or Circles? User asked for "round particles" in prev prompt, 
                    // but "same size like experience" (which are rects).
                    // Comparison: Experience = Rects. Contact Prev = Round.
                    // User said: "use same size ... smooth like in a game". 
                    // I will use Circles as per previous specific request, just larger.
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.restore();
                }
            }
            ctx.globalCompositeOperation = 'source-over'; // Reset

            animationId = requestAnimationFrame(render);
        };

        // ScrollTrigger to fire explosion
        ScrollTrigger.create({
            trigger: canvas,
            start: "top 60%", // Fire when section is mostly visible
            onEnter: () => {
                createExplosion();
                render();
            },
            onLeaveBack: () => {
                cancelAnimationFrame(animationId);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        });

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default Explosion;
