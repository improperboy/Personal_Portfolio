import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Simulate loading progress over ~3 seconds
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsComplete(true);
                        onLoadingComplete?.();
                    }, 200);
                    return 100;
                }
                // Randomize progress increments for realistic feel
                // Increment values adjusted to complete in ~3 seconds
                const increment = Math.random() * 4 + 3;
                return Math.min(prev + increment, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onLoadingComplete]);

    // Generate floating particles
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
    }));

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-background"
                >
                    {/* Animated particles background */}
                    <div className="absolute inset-0 overflow-hidden">
                        {particles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                className="absolute rounded-full bg-primary/30"
                                style={{
                                    left: `${particle.x}%`,
                                    top: `${particle.y}%`,
                                    width: particle.size,
                                    height: particle.size,
                                }}
                                animate={{
                                    y: [-20, 20, -20],
                                    opacity: [0.2, 0.6, 0.2],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: particle.duration,
                                    repeat: Infinity,
                                    delay: particle.delay,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>

                    {/* Gradient orbs */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
                            style={{
                                background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
                            style={{
                                background: 'radial-gradient(circle, hsl(var(--secondary) / 0.3) 0%, transparent 70%)',
                            }}
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 2,
                            }}
                        />
                    </div>

                    {/* Main loading content */}
                    <div className="relative z-10 flex flex-col items-center gap-8 px-4">
                        {/* Animated logo/text */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="text-center"
                        >
                            <motion.h1
                                className="text-6xl md:text-8xl font-bold gradient-text mb-4"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                style={{
                                    backgroundSize: '200% 200%',
                                }}
                            >
                                Portfolio
                            </motion.h1>
                            <motion.p
                                className="text-lg md:text-xl text-muted-foreground font-mono"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                Loading experience...
                            </motion.p>
                        </motion.div>

                        {/* Progress bar container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="w-full max-w-md"
                        >
                            {/* Progress percentage */}
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-mono text-muted-foreground">
                                    Loading assets...
                                </span>
                                <motion.span
                                    className="text-sm font-mono text-primary font-semibold"
                                    key={Math.floor(progress)}
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {Math.floor(progress)}%
                                </motion.span>
                            </div>

                            {/* Progress bar track */}
                            <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm border border-border/50">
                                {/* Animated background */}
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.1) 50%, transparent 100%)',
                                        backgroundSize: '200% 100%',
                                    }}
                                    animate={{
                                        backgroundPosition: ['0% 0%', '200% 0%'],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                />

                                {/* Progress fill */}
                                <motion.div
                                    className="relative h-full rounded-full"
                                    style={{
                                        background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))',
                                        boxShadow: '0 0 20px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--primary) / 0.3)',
                                    }}
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                >
                                    {/* Glow effect at the end */}
                                    <motion.div
                                        className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white"
                                        animate={{
                                            opacity: [0.6, 1, 0.6],
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                        style={{
                                            boxShadow: '0 0 15px hsl(var(--primary)), 0 0 30px hsl(var(--primary) / 0.5)',
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Animated dots */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex gap-2"
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-primary"
                                    animate={{
                                        opacity: [0.3, 1, 0.3],
                                        scale: [1, 1.3, 1],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: 'easeInOut',
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl" />
                    <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-2xl" />
                    <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-primary/30 rounded-bl-2xl" />
                    <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/30 rounded-br-2xl" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
