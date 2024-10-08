import classes from './Slide.module.sass';

import { useState, useEffect } from 'react';
import { Typography } from "../../../../UI/Typography/Typography.jsx";
import {ArrowRightIcon} from "../../../../assets/Icons/ArrowRightIcon.jsx";
import {ArrowLeftIcon} from "../../../../assets/Icons/ArrowLeftIcon.jsx";

const Slide = ({ images, name, description }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const totalImages = images.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
        }, 2000);

        return () => clearInterval(interval);
    }, [totalImages]);

    return (
        <div className={classes.slideContent}>
            <div className={classes.slideImage}>
                {totalImages > 0 ? (
                    <img src={images[currentImageIndex]} alt={name} />
                ) : (
                    <div>No Images</div>
                )}
            </div>
            <div className={classes.slideText}>
                <Typography variant="h4">{name}</Typography>
                <Typography className={classes.slideTextTitle} variant="body600">{description}</Typography>
            </div>
        </div>
    );
};

const Slider = ({ slides }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const totalSlides = slides.length;

    const handlePrevSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    };

    const handleNextSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    return (
        <div className={classes.sliderContainer}>
            <button className={classes.sliderButtonPrev} onClick={handlePrevSlide}>
                <ArrowLeftIcon color="black" width="24px" height="24px"/>
            </button>

            <div className={classes.sliderWrapper}>
                {totalSlides > 0 ? (
                    <Slide {...slides[currentSlideIndex]} />
                ) : (
                    <div>No Slides Available</div>
                )}
            </div>
            <button className={classes.sliderButtonNext} onClick={handleNextSlide}>
                <ArrowRightIcon  color="black" width="24px" height="24px"/>
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
