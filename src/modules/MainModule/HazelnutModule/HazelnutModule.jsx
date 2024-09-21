import classes from "./HazelnutModule.module.sass";

import { MultiContainer } from "../../../UI/container/MultiContainer.jsx";
import { Typography } from "../../../UI/Typography/Typography.jsx";
import { useEffect, useRef, useState } from "react";
import { useLoaderData, useLocation, Link } from "react-router-dom";
import {ArrowRightMoreIcon} from "../../../assets/Icons/ArrowRightMoreIcon.jsx";
import {useTranslation} from "react-i18next";

export const HazelnutModule = () => {
    const { recipe } = useLoaderData();

    const { t } = useTranslation();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleImageClick = (index) => {
        let angleDiff = (index - currentIndex + recipe.length) % recipe.length;

        if (angleDiff > recipe.length / 2) {
            angleDiff = angleDiff - recipe.length;
        }

        const angle = angleDiff * (360 / recipe.length);

        setRotationAngle((prevAngle) => prevAngle - angle);
        setCurrentIndex(index);
    };

    const hazelnutRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollToHazelnut && hazelnutRef.current) {
            hazelnutRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <MultiContainer>
                <div className={classes.nut} ref={hazelnutRef}>
                    <div className={classes.nutContent}>
                        <Typography variant="h2">
                            {recipe[currentIndex].product_title}
                        </Typography>
                        <Typography variant="body600" className={classes.nutContentText}>
                            {recipe[currentIndex].description}
                        </Typography>
                        <Link to={recipe[currentIndex].link} target="_blank">
                            <button className={classes.recipeBtn}>
                                {t("aboutUs.recipes")}
                                <ArrowRightMoreIcon height="20px" color="white" width="20px"/>
                            </button>
                        </Link>
                    </div>
                    <div className={classes.nutCardContainer}>
                        <div
                            className={classes.nutCard}
                            style={{ transform: `rotate(${rotationAngle}deg)` }}
                        >
                            {recipe?.map((content, index) => {
                                const angle = (index * 360) / recipe.length;
                                const isActive = index === currentIndex;

                                const imgStyle = {
                                    transform: `rotate(${angle}deg) translateX(${windowWidth <= 420 ? '-230px' : '-350px'}) rotate(${-angle - rotationAngle}deg)`,
                                    width: isActive ? (windowWidth <= 420 ? "213px" : "423px") : (windowWidth <= 420 ? "171px" : "250px"),
                                    cursor: "pointer",
                                };

                                return (
                                    <img
                                        key={index}
                                        className={`${classes.img} ${isActive ? classes.activeImg : ""}`}
                                        src={content.image}
                                        alt={content.product_title}
                                        style={imgStyle}
                                        onClick={() => handleImageClick(index)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </MultiContainer>
    );
};
