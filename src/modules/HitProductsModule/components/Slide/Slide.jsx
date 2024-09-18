import classes from './Slide.module.sass';

import  { useState } from 'react';
import { Typography } from "../../../../UI/Typography/Typography.jsx";

const Slide = ({ image, name, description }) => (
    <div className={classes.slideContent}>
        <div className={classes.slideImage}>
            <img src={image} alt={name}/>
        </div>
        <div className={classes.slideText}>
            <Typography  variant="h3">{name}</Typography>
            <Typography className={classes.slideTextTitle} variant="bodyL">{description}</Typography>
        </div>
    </div>
);

const Slider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = slides.length;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalSlides - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < totalSlides - 1 ? prevIndex + 1 : 0));
    };

    const showPrevButton = currentIndex > 0;
    const showNextButton = currentIndex < totalSlides - 1;

    return (
        <div className={classes.sliderContainer}>
            {showPrevButton && (
                <button className={classes.sliderButtonPrev} onClick={handlePrev}>
                    ‹
                </button>
            )}
            <div className={classes.sliderWrapper}>
                <Slide {...slides[currentIndex]} />
            </div>
            {showNextButton && (
                <button className={classes.sliderButtonNext} onClick={handleNext}>
                    ›
                </button>
            )}

            <div className={classes.indicatorContainer}>
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`${classes.indicator} ${index === currentIndex ? classes.activeIndicator : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
