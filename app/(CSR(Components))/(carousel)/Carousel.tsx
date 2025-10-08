'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Box, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { NavArrowLeft, NavArrowRight } from 'iconoir-react';

// --- Tipos de Props ---
interface CarouselProps {
    images: string[];
    texts?: string[];
}

// --- Definición de Animaciones ---
const animations = {
    fadeIn: {
        '@keyframes fadeIn': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
        },
        animation: 'fadeIn 800ms ease-in-out forwards',
    },
    fadeOut: {
        '@keyframes fadeOut': {
            '0%': { opacity: 1 },
            '100%': { opacity: 0 },
        },
        animation: 'fadeOut 800ms ease-in-out forwards',
    },
};
// --- Fin Definición de Animaciones ---

const Carousel: React.FC<CarouselProps> = ({ images, texts = [] }) => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [previousStep, setPreviousStep] = useState<number>(0);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const validTexts = React.useMemo(
        () => (texts && texts.length === images.length ? texts : Array(images.length).fill('')),
        [texts, images]
    );

    const maxSteps = images.length;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const startTransition = useCallback(
        (newStep: number) => {
            if (isTransitioning || newStep === activeStep) return;

            setPreviousStep(activeStep);
            setActiveStep(newStep);
            setIsTransitioning(true);

            setTimeout(() => setIsTransitioning(false), 800);
        },
        [activeStep, isTransitioning]
    );

    const handleNext = useCallback(() => {
        const nextStep = activeStep === maxSteps - 1 ? 0 : activeStep + 1;
        startTransition(nextStep);
    }, [activeStep, maxSteps, startTransition]);

    const handleBack = useCallback(() => {
        const prevStep = activeStep === 0 ? maxSteps - 1 : activeStep - 1;
        startTransition(prevStep);
    }, [activeStep, maxSteps, startTransition]);

    const handleDotClick = useCallback(
        (index: number) => startTransition(index),
        [startTransition]
    );

    useEffect(() => {
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, [handleNext]);

    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (isTransitioning) return;
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!touchStart || isTransitioning) return;
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd || isTransitioning) {
            setTouchStart(null);
            setTouchEnd(null);
            return;
        }

        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) handleNext();
        else if (distance < -minSwipeDistance) handleBack();

        setTouchStart(null);
        setTouchEnd(null);
    };

    // --- Estilos base ---
    const textBaseStyle = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -45%)',
        color: 'white',
        textAlign: 'center' as const,
        fontWeight: 'bold' as const,
        textShadow: '4px 5px 4px rgba(0, 0, 0, 0.9)',
        width: '60%',
        pointerEvents: 'none' as const,
        fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '6rem' },
    };

    const imageBaseStyle = {
        position: 'absolute' as const,
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover' as const,
    };

    return (
        <Box
            sx={{
                position: 'relative',
                height: { xs: '30vh', sm: '40vh', md: '50vh', lg: '75vh' },
                overflow: 'hidden',
                width: '100vw',
                my: 0,
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                boxShadow: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <Box sx={{ position: 'absolute', inset: 0 }}>
                {/* Elementos del Slide Anterior */}
                {isTransitioning && (
                    <>
                        <Box
                            component="img"
                            key={`img-prev-${previousStep}`}
                            src={images[previousStep]}
                            alt=""
                            loading="lazy"
                            sx={{
                                ...imageBaseStyle,
                                zIndex: 1,
                                opacity: 1,
                                ...animations.fadeOut,
                            }}
                        />
                        <Typography
                            key={`text-prev-${previousStep}`}
                            sx={{
                                ...textBaseStyle,
                                zIndex: 3,
                                opacity: 1,
                                ...animations.fadeOut,
                            }}
                        >
                            {validTexts[previousStep]?.toUpperCase()}
                        </Typography>
                    </>
                )}

                {/* Elementos del Slide Actual */}
                <Box
                    component="img"
                    key={`img-active-${activeStep}`}
                    src={images[activeStep]}
                    alt={`slide-${activeStep}`}
                    loading="lazy"
                    sx={{
                        ...imageBaseStyle,
                        zIndex: 2,
                        opacity: !isTransitioning ? 1 : 0,
                        ...(isTransitioning && animations.fadeIn),
                    }}
                />
                <Typography
                    key={`text-active-${activeStep}`}
                    sx={{
                        ...textBaseStyle,
                        zIndex: 4,
                        opacity: !isTransitioning ? 1 : 0,
                        ...(isTransitioning && animations.fadeIn),
                    }}
                >
                    {validTexts[activeStep]?.toUpperCase()}
                </Typography>
            </Box>

            {/* Botón Siguiente */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: { xs: '12px', sm: '24px' },
                    transform: 'translateY(-50%)',
                    zIndex: 5,
                }}
            >
                <IconButton
                    onClick={handleNext}
                    disabled={isTransitioning}
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' },
                        backdropFilter: 'blur(4px)',
                    }}
                    size={isMobile ? 'small' : 'medium'}
                >
                    <NavArrowRight />
                </IconButton>
            </Box>

            {/* Botón Anterior */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: { xs: '12px', sm: '24px' },
                    transform: 'translateY(-50%)',
                    zIndex: 5,
                }}
            >
                <IconButton
                    onClick={handleBack}
                    disabled={isTransitioning}
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' },
                        backdropFilter: 'blur(4px)',
                    }}
                    size={isMobile ? 'small' : 'medium'}
                >
                    <NavArrowLeft />
                </IconButton>
            </Box>

            {/* Indicadores (Dots) */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: { xs: 12, sm: 20 },
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1,
                    zIndex: 5,
                    p: 1,
                    borderRadius: 8,
                    bgcolor: 'rgba(0,0,0,0.2)',
                    backdropFilter: 'blur(4px)',
                }}
            >
                {images.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => !isTransitioning && handleDotClick(index)}
                        sx={{
                            width: { xs: 6, sm: 8 },
                            height: { xs: 6, sm: 8 },
                            borderRadius: '50%',
                            bgcolor: index === activeStep ? 'white' : 'rgba(255,255,255,0.5)',
                            transition: 'background-color 300ms ease, transform 300ms ease',
                            cursor: isTransitioning ? 'default' : 'pointer',
                            transform: index === activeStep ? 'scale(1.2)' : 'scale(1)',
                            '&:hover': {
                                bgcolor: isTransitioning
                                    ? undefined
                                    : index === activeStep
                                        ? 'white'
                                        : 'rgba(255,255,255,0.8)',
                            },
                        }}
                    />

                ))}
            </Box>

            {/* Overlay Gradiente */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100px',
                    background:
                        'linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
                    pointerEvents: 'none',
                    zIndex: 4,
                }}
            />
        </Box>
    );
};

export default Carousel;
