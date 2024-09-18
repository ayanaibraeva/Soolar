// import React, { useState } from 'react';
// import classes from './Slider.module.sass';
// import Slide from "../Slide/Slide.jsx";
//
//
// const Slider = ({ slides }) => {
//     const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//     const totalSlides = slides.length;
//
//     const handlePrevSlide = () => {
//         setCurrentSlideIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalSlides - 1));
//     };
//
//     const handleNextSlide = () => {
//         setCurrentSlideIndex((prevIndex) => (prevIndex < totalSlides - 1 ? prevIndex + 1 : 0));
//     };
//
//     return (
//         <div className={classes.sliderContainer}>
//             <button className={classes.sliderButtonPrev} onClick={handlePrevSlide}>
//                 ‹
//             </button>
//             <div className={classes.sliderWrapper}>
//                 <Slide {...slides[currentSlideIndex]} />
//             </div>
//             <button className={classes.sliderButtonNext} onClick={handleNextSlide}>
//                 ›
//             </button>
//
//             {/* Slide indicators */}
//             <div className={classes.indicatorContainer}>
//                 {slides.map((_, index) => (
//                     <div
//                         key={index}
//                         className={`${classes.indicator} ${index === currentSlideIndex ? classes.activeIndicator : ''}`}
//                         onClick={() => setCurrentSlideIndex(index)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default Slider;
