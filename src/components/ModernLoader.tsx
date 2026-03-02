import React, { useEffect, useState, useRef } from 'react';
import './ModernLoader.scss';

interface ModernLoaderProps {
    onFinish: () => void;
}

const ModernLoader: React.FC<ModernLoaderProps> = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Initializing');
    const [dots, setDots] = useState('');
    const [tradingTip, setTradingTip] = useState('');
    const [lightningActive, setLightningActive] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Trading tips and motivational quotes
    const tradingTips = [
        'Building wealth through smart trading',
        'Your trusted partner in market success',
        'Professional trading strategies for everyone',
        'Precision trading, consistent results',
        'Quality execution in every trade',
        'Navigate markets with confidence',
        'Fast execution, reliable returns',
        'Growing your portfolio steadily',
        'TAIFA - Your path to financial freedom',
        'Elevate your trading experience',
    ];

    // Trading chart background with modern teal theme
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Floating currency symbols
        const symbols = ['$', '€', '£', '¥', '₿', '₹', '₦'];
        const floatingSymbols: Array<{
            x: number;
            y: number;
            symbol: string;
            speed: number;
            opacity: number;
            size: number;
            rotation: number;
            rotationSpeed: number;
        }> = [];

        for (let i = 0; i < 30; i++) {
            floatingSymbols.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                symbol: symbols[Math.floor(Math.random() * symbols.length)],
                speed: Math.random() * 0.3 + 0.1,
                opacity: Math.random() * 0.2 + 0.05,
                size: Math.random() * 30 + 20,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
            });
        }

        // Geometric shapes (triangles and circles)
        const shapes: Array<{
            x: number;
            y: number;
            size: number;
            type: 'triangle' | 'circle' | 'square';
            speed: number;
            opacity: number;
            rotation: number;
        }> = [];

        for (let i = 0; i < 20; i++) {
            const types: ('triangle' | 'circle' | 'square')[] = ['triangle', 'circle', 'square'];
            shapes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 40 + 20,
                type: types[Math.floor(Math.random() * types.length)],
                speed: Math.random() * 0.4 + 0.2,
                opacity: Math.random() * 0.15 + 0.05,
                rotation: Math.random() * Math.PI * 2,
            });
        }

        // Wave lines
        const waves: Array<{
            y: number;
            amplitude: number;
            frequency: number;
            speed: number;
            opacity: number;
            offset: number;
        }> = [];

        for (let i = 0; i < 5; i++) {
            waves.push({
                y: (canvas.height / 6) * (i + 1),
                amplitude: Math.random() * 30 + 20,
                frequency: Math.random() * 0.01 + 0.005,
                speed: Math.random() * 0.02 + 0.01,
                opacity: Math.random() * 0.1 + 0.05,
                offset: 0,
            });
        }

        let animationFrame = 0;

        const draw = () => {
            animationFrame++;

            // Dark teal gradient background
            const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            bgGradient.addColorStop(0, '#0a1f1f');
            bgGradient.addColorStop(0.5, '#0d2626');
            bgGradient.addColorStop(1, '#0f2d2d');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw wave lines
            waves.forEach(wave => {
                ctx.globalAlpha = wave.opacity;
                ctx.strokeStyle = '#14b8a6';
                ctx.lineWidth = 2;
                ctx.beginPath();

                for (let x = 0; x < canvas.width; x += 5) {
                    const y = wave.y + Math.sin(x * wave.frequency + wave.offset) * wave.amplitude;
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                ctx.stroke();
                wave.offset += wave.speed;
            });

            // Draw geometric shapes
            shapes.forEach(shape => {
                ctx.globalAlpha = shape.opacity;
                ctx.fillStyle = '#14b8a6';
                ctx.strokeStyle = '#5eead4';
                ctx.lineWidth = 2;

                ctx.save();
                ctx.translate(shape.x, shape.y);
                ctx.rotate(shape.rotation);

                if (shape.type === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
                    ctx.stroke();
                } else if (shape.type === 'triangle') {
                    ctx.beginPath();
                    ctx.moveTo(0, -shape.size / 2);
                    ctx.lineTo(shape.size / 2, shape.size / 2);
                    ctx.lineTo(-shape.size / 2, shape.size / 2);
                    ctx.closePath();
                    ctx.stroke();
                } else if (shape.type === 'square') {
                    ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                }

                ctx.restore();

                // Move shape
                shape.y += shape.speed;
                shape.rotation += 0.01;

                if (shape.y > canvas.height + 50) {
                    shape.y = -50;
                    shape.x = Math.random() * canvas.width;
                }
            });

            // Draw floating currency symbols
            floatingSymbols.forEach(symbol => {
                ctx.globalAlpha = symbol.opacity;
                ctx.fillStyle = '#5eead4';
                ctx.font = `${symbol.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                ctx.save();
                ctx.translate(symbol.x, symbol.y);
                ctx.rotate(symbol.rotation);
                ctx.fillText(symbol.symbol, 0, 0);
                ctx.restore();

                // Move symbol
                symbol.y -= symbol.speed;
                symbol.rotation += symbol.rotationSpeed;

                if (symbol.y < -50) {
                    symbol.y = canvas.height + 50;
                    symbol.x = Math.random() * canvas.width;
                }
            });

            // Draw grid pattern
            if (animationFrame % 2 === 0) {
                ctx.globalAlpha = 0.03;
                ctx.strokeStyle = '#14b8a6';
                ctx.lineWidth = 1;

                const gridSize = 50;
                for (let x = 0; x < canvas.width; x += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, canvas.height);
                    ctx.stroke();
                }

                for (let y = 0; y < canvas.height; y += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(canvas.width, y);
                    ctx.stroke();
                }
            }

            ctx.globalAlpha = 1;
        };

        const interval = setInterval(draw, 33);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Select random tip
        const randomTip = tradingTips[Math.floor(Math.random() * tradingTips.length)];
        setTradingTip(randomTip);

        // Multi-phase loading system
        const loadingPhases = [
            { duration: 1000, text: 'Initializing Platform', progress: 15 },
            { duration: 800, text: 'Loading Market Data', progress: 30 },
            { duration: 1200, text: 'Connecting to Markets', progress: 50 },
            { duration: 900, text: 'Activating Trading Signals', progress: 70 },
            { duration: 700, text: 'Loading Strategies', progress: 85 },
            { duration: 600, text: 'Preparing Dashboard', progress: 95 },
            { duration: 500, text: 'Welcome to TAIFA', progress: 100 },
        ];

        let currentPhase = 0;

        const executePhase = () => {
            if (currentPhase < loadingPhases.length) {
                const phase = loadingPhases[currentPhase];
                setLoadingText(phase.text);

                // Smooth progress animation
                const startProgress = progress;
                const targetProgress = phase.progress;
                const duration = phase.duration;
                const startTime = Date.now();

                const animateProgress = () => {
                    const elapsed = Date.now() - startTime;
                    const progressRatio = Math.min(elapsed / duration, 1);
                    const easeOutQuart = 1 - Math.pow(1 - progressRatio, 4);
                    const currentProgress = startProgress + (targetProgress - startProgress) * easeOutQuart;

                    setProgress(currentProgress);

                    if (progressRatio < 1) {
                        requestAnimationFrame(animateProgress);
                    } else {
                        currentPhase++;
                        if (currentPhase < loadingPhases.length) {
                            setTimeout(executePhase, 100);
                        } else {
                            setTimeout(onFinish, 800);
                        }
                    }
                };

                requestAnimationFrame(animateProgress);
            }
        };

        executePhase();

        // Dots animation
        let dotCount = 0;
        const dotInterval = setInterval(() => {
            dotCount = (dotCount + 1) % 4;
            setDots('.'.repeat(dotCount));
        }, 400);

        // Lightning strike effect
        const lightningInterval = setInterval(() => {
            setLightningActive(true);
            setTimeout(() => setLightningActive(false), 200);
        }, 2000);

        return () => {
            clearInterval(dotInterval);
            clearInterval(lightningInterval);
        };
    }, [onFinish]);

    return (
        <div className='modern-loader zeus-loader'>
            {/* Matrix-style falling money and code background */}
            <canvas ref={canvasRef} className='zeus-loader__matrix-canvas' />

            {/* Lightning flash overlay */}
            <div className={`zeus-loader__lightning-flash ${lightningActive ? 'active' : ''}`} />

            {/* Dark storm clouds background */}
            <div className='zeus-loader__storm-bg'>
                <div className='zeus-loader__cloud zeus-loader__cloud--1' />
                <div className='zeus-loader__cloud zeus-loader__cloud--2' />
                <div className='zeus-loader__cloud zeus-loader__cloud--3' />
            </div>

            {/* Main content */}
            <div className='zeus-loader__content'>
                {/* TAIFA Logo */}
                <div className='zeus-loader__logo-container'>
                    <div className='zeus-loader__logo-text'>
                        <span className='zeus-loader__logo-letter'>T</span>
                        <span className='zeus-loader__logo-letter'>A</span>
                        <span className='zeus-loader__logo-letter'>I</span>
                        <span className='zeus-loader__logo-letter'>F</span>
                        <span className='zeus-loader__logo-letter'>A</span>
                    </div>
                    <div className='zeus-loader__logo-glow' />
                    <div className='zeus-loader__logo-glow zeus-loader__logo-glow--secondary' />
                </div>

                {/* Zeus Lightning Bolt Icon */}
                <div className='zeus-loader__lightning-container' style={{ display: 'none' }}>
                    {/* Animated lightning bolt with intricate parts */}
                    <svg
                        className='zeus-loader__lightning-bolt'
                        viewBox='0 0 200 300'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <defs>
                            <linearGradient id='lightningGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                                <stop offset='0%' stopColor='#FFD700' />
                                <stop offset='50%' stopColor='#FFA500' />
                                <stop offset='100%' stopColor='#FF6B00' />
                            </linearGradient>
                            <filter id='glow'>
                                <feGaussianBlur stdDeviation='4' result='coloredBlur' />
                                <feMerge>
                                    <feMergeNode in='coloredBlur' />
                                    <feMergeNode in='SourceGraphic' />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Main lightning bolt */}
                        <path
                            className='zeus-loader__bolt-main'
                            d='M100 10 L80 100 L120 100 L90 180 L130 120 L100 120 L110 60 Z'
                            fill='url(#lightningGradient)'
                            filter='url(#glow)'
                        />

                        {/* Electric arcs - animated parts */}
                        <path
                            className='zeus-loader__bolt-arc zeus-loader__bolt-arc--1'
                            d='M85 50 Q70 60 75 80'
                            stroke='#4169E1'
                            strokeWidth='2'
                            fill='none'
                            opacity='0.8'
                        />
                        <path
                            className='zeus-loader__bolt-arc zeus-loader__bolt-arc--2'
                            d='M115 70 Q130 80 125 100'
                            stroke='#00BFFF'
                            strokeWidth='2'
                            fill='none'
                            opacity='0.8'
                        />
                        <path
                            className='zeus-loader__bolt-arc zeus-loader__bolt-arc--3'
                            d='M95 130 Q80 140 85 160'
                            stroke='#FFD700'
                            strokeWidth='2'
                            fill='none'
                            opacity='0.8'
                        />

                        {/* Energy particles */}
                        {[...Array(8)].map((_, i) => (
                            <circle
                                key={i}
                                className='zeus-loader__energy-particle'
                                cx={100 + Math.cos((i * Math.PI) / 4) * 40}
                                cy={100 + Math.sin((i * Math.PI) / 4) * 40}
                                r='3'
                                fill='#FFD700'
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}

                        {/* Rotating energy ring */}
                        <circle
                            className='zeus-loader__energy-ring'
                            cx='100'
                            cy='100'
                            r='60'
                            fill='none'
                            stroke='#4169E1'
                            strokeWidth='2'
                            strokeDasharray='10 5'
                            opacity='0.5'
                        />
                    </svg>

                    {/* Pulsing glow effect */}
                    <div className='zeus-loader__lightning-glow' />
                    <div className='zeus-loader__lightning-glow zeus-loader__lightning-glow--secondary' />
                </div>

                {/* Brand name */}
                <h1 className='zeus-loader__brand'>
                    <span className='zeus-loader__brand-zeus'>TRADE WITH</span>
                    <span className='zeus-loader__brand-trading'>TAIFA</span>
                </h1>

                <p className='zeus-loader__tagline'>Professional Trading Platform</p>

                {/* Loading text */}
                <div className='zeus-loader__text-container'>
                    <div className='zeus-loader__text'>
                        {loadingText}
                        {dots}
                    </div>
                </div>

                {/* Progress bar with electric effect */}
                <div className='zeus-loader__progress-container'>
                    <div className='zeus-loader__progress-label'>
                        <span>Power Level</span>
                        <span className='zeus-loader__progress-percentage'>{Math.round(Math.min(progress, 100))}%</span>
                    </div>
                    <div className='zeus-loader__progress-bar'>
                        <div className='zeus-loader__progress-fill' style={{ width: `${Math.min(progress, 100)}%` }}>
                            <div className='zeus-loader__progress-lightning' />
                        </div>
                    </div>
                </div>

                {/* Trading Tip */}
                <div className='zeus-loader__trading-tip'>
                    <div className='zeus-loader__tip-icon'>
                        <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <defs>
                                <linearGradient id='iconGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                                    <stop offset='0%' stopColor='#FFD700' />
                                    <stop offset='100%' stopColor='#FFA500' />
                                </linearGradient>
                            </defs>
                            {/* Mechanical gear icon */}
                            <circle cx='12' cy='12' r='3' fill='url(#iconGradient)' />
                            <path
                                d='M12 1L13.5 4.5L17 3L16 6.5L19.5 7.5L17.5 10.5L21 12L17.5 13.5L19.5 16.5L16 17.5L17 21L13.5 19.5L12 23L10.5 19.5L7 21L8 17.5L4.5 16.5L6.5 13.5L3 12L6.5 10.5L4.5 7.5L8 6.5L7 3L10.5 4.5L12 1Z'
                                fill='url(#iconGradient)'
                                opacity='0.6'
                            />
                            {/* Inner mechanical details */}
                            <circle cx='12' cy='12' r='5' fill='none' stroke='#FFD700' strokeWidth='0.5' />
                            <circle cx='12' cy='12' r='7' fill='none' stroke='#FFA500' strokeWidth='0.3' />
                        </svg>
                    </div>
                    <p className='zeus-loader__tip-text'>{tradingTip}</p>
                </div>
            </div>
        </div>
    );
};

export default ModernLoader;
