import classes from './Slide.module.sass';

import { useState, useEffect } from 'react';
import { Typography } from "../../../../UI/Typography/Typography.jsx";

const Slide = ({ images, name, description }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const totalImages = images.length;

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalImages - 1));
    };
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex < totalImages - 1 ? prevIndex + 1 : 0));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
        }, 2000);

        return () => clearInterval(interval);
    }, [totalImages]);

    return (
        <div className={classes.slideContent}>
            <div className={classes.slideImage}>
                <button className={classes.sliderButtonPrev} onClick={handlePrevImage}>
                    ‹
                </button>
                <img src={images[currentImageIndex]} alt={name} />
                <button className={classes.sliderButtonNext} onClick={handleNextImage}>
                    ›
                </button>
            </div>
            <div className={classes.slideText}>
                <Typography variant="h3">{name}</Typography>
                <Typography className={classes.slideTextTitle} variant="bodyL">{description}</Typography>
            </div>
        </div>
    );
};

const Slider = ({ slides }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const totalSlides = slides.length;

    const handlePrevSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalSlides - 1));
    };

    const handleNextSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex < totalSlides - 1 ? prevIndex + 1 : 0));
    };

    return (
        <div className={classes.sliderContainer}>
            <button className={classes.sliderButtonPrev} onClick={handlePrevSlide}>
                ‹
            </button>
            <div className={classes.sliderWrapper}>
                <Slide {...slides[currentSlideIndex]} />
            </div>
            <button className={classes.sliderButtonNext} onClick={handleNextSlide}>
                ›
            </button>

            <div className={classes.indicatorContainer}>
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`${classes.indicator} ${index === currentSlideIndex ? classes.activeIndicator : ''}`}
                        onClick={() => setCurrentSlideIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
