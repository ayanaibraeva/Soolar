import classes from "./HazelnutModule.module.sass";

import { MultiContainer } from "../../../UI/container/MultiContainer.jsx";
import { Typography } from "../../../UI/Typography/Typography.jsx";
import { useEffect, useRef, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { ArrowRightMoreIcon } from "../../../assets/Icons/ArrowRightMoreIcon.jsx";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

export const HazelnutModule = () => {
    const { recipe } = useLoaderData();
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const hazelnutRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleImageClick = (index) => {
        let angleDiff = (index - currentIndex + recipe.length) % recipe.length;
        if (angleDiff > recipe.length / 2) {
            angleDiff = angleDiff - recipe.length;
        }
        const angle = angleDiff * (360 / recipe.length);
        setRotationAngle((prevAngle) => prevAngle - angle);
        setCurrentIndex(index);
    };

    const handleNavigate = () => {
        navigate(`/recipe/${recipe[currentIndex].id}`);
    };

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

    if (!recipe?.length) {
        return <p>{t('Рецепты не найдены. Пожалуйста, попробуйте позже.')}</p>;
    }

    return (
        <MultiContainer>
            <div className={classes.nut} ref={hazelnutRef}>
                <div className={classes.nutContent}>
                    <Typography variant="h2">
                        {recipe[currentIndex]?.product_title}
                    </Typography>
                    <div className={classes.nutContentText}>
                        {parse(
                            recipe[currentIndex]?.description?.length > 100
                                ? `${recipe[currentIndex]?.description?.substring(0, 200)}...`
                                : recipe[currentIndex]?.description
                        )}
                    </div>
                    <button className={classes.recipeBtn} onClick={handleNavigate}>
                        {t('aboutUs.learnMore')}
                        <ArrowRightMoreIcon height="24px" color="white" width="24px" />
                    </button>
                </div>
                <div className={classes.nutCardContainer}>
                    <div className={classes.nutCard} style={{ transform: `rotate(${rotationAngle}deg)` }}>
                        {recipe?.map((content, index) => {
                            const angle = (index * 360) / recipe.length;
                            const isActive = index === currentIndex;
                            const imgStyle = {
                                transform: `rotate(${angle}deg) translateX(${windowWidth <= 768 ? '-210px' : '-330px'}) rotate(${-angle - rotationAngle}deg)`,
                                width: isActive ? (windowWidth <= 768 ? "213px" : "423px") : (windowWidth <= 768 ? "171px" : "250px"),
                                cursor: "pointer",
                            };
                            return (
                                <img
                                    key={index}
                                    className={`${classes.img} ${isActive ? classes.activeImg : ""}`}
                                    src={content?.image}
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
