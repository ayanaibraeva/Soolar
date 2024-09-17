import React, { useState } from 'react';
import styles from './Slide.module.sass';

const Slide = ({ image, name }) => (
    <div className={styles.slideContent}>
        <img src={image} alt={name} className={styles.slideImage} />
        <div className={styles.slideText}>
            <h3>{name}</h3>
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
        <div className={styles.sliderContainer}>
            {showPrevButton && (
                <button className={styles.sliderButtonPrev} onClick={handlePrev}>
                    ‹
                </button>
            )}
            <div className={styles.sliderWrapper}>
                <Slide {...slides[currentIndex]} />
            </div>
            {showNextButton && (
                <button className={styles.sliderButtonNext} onClick={handleNext}>
                    ›
                </button>
            )}

            <div className={styles.indicatorContainer}>
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
