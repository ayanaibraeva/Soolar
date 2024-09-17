import classes from "./HazelnutModule.module.sass";

import HazelnutPaste from "../../../../src/assets/Image/hazelnutPaste.webp";
import PistachioPaste from "../../../../src/assets/Image/pistachioPasta.webp";
import AlmondPasta from "../../../../src/assets/Image/AlmondPasta.webp";
import WhiteAlmond from "../../../../src/assets/Image/whiteAlmonds.webp";

import { MultiContainer } from "../../../UI/container/MultiContainer.jsx";
import { Typography } from "../../../UI/Typography/Typography.jsx";
import { useEffect, useRef, useState } from "react";
import { useLoaderData, useLocation, Link } from "react-router-dom";
import { ArrowRightMoreIcon } from "../../../assets/Icons/ArrowRightMoreIcon.jsx";

// const contentData = [
//     {
//         id: 1,
//         imgSrc: HazelnutPaste,
//         title: "Фундучная паста",
//         description:
//             "Бренд Solaar1 производится в солнечной стране опоясанной высокими горами Кыргызстан. " +
//             "Южные края славятся вкусными и питательными орехами, что стала причиной создания компании, " +
//             "которая занимается производством ароматных и полезных ореховых паст.",
//         recipeLink: "https://www.instagram.com/reel/C-vblEhsEwx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
//     },
//     {
//         id: 2,
//         imgSrc: PistachioPaste,
//         title: "Фисташковая паста",
//         description:
//             "Бренд Solaar2 производится в солнечной стране опоясанной высокими горами Кыргызстан. " +
//             "Южные края славятся вкусными и питательными орехами, что стала причиной создания компании, " +
//             "которая занимается производством ароматных и полезных ореховых паст.",
//         recipeLink: "https://www.instagram.com/reel/C-vblEhsEwx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
//     },
//     {
//         id: 3,
//         imgSrc: AlmondPasta,
//         title: "Миндальная паста",
//         description:
//             "Бренд Solaar3 производится в солнечной стране опоясанной высокими горами Кыргызстан." +
//             " Южные края славятся вкусными и питательными орехами, что стала причиной создания компании, " +
//             "которая занимается производством ароматных и полезных ореховых паст.",
//         recipeLink: "https://www.instagram.com/reel/C-vblEhsEwx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
//     },
//     {
//         id: 4,
//         imgSrc: WhiteAlmond,
//         title: "Белый миндаль",
//         description:
//             "Бренд Solaar4 производится в солнечной стране опоясанной высокими горами Кыргызстан. " +
//             "Южные края славятся вкусными и питательными орехами, что стала причиной создания компании, " +
//             "которая занимается производством ароматных и полезных ореховых паст.",
//         recipeLink: "https://www.instagram.com/reel/C-vblEhsEwx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
//     },
// ];

export const HazelnutModule = () => {
    const { recipe } = useLoaderData();

    console.log(recipe, "sss");

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
                        {recipe[currentIndex].title}
                    </Typography>
                    <Typography variant="body600">
                        {recipe[currentIndex].description}
                    </Typography>
                    <div>
                        <Link to={recipe[currentIndex].recipeLink} target="_blank">
                            <button className={classes.recipeBtn}>
                                Рецепт
                                <ArrowRightMoreIcon height="20px" color="white" width="20px"/>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={classes.nutCardContainer}>
                    <div
                        className={classes.nutCard}
                        style={{ transform: `rotate(${rotationAngle}deg)` }}
                    >
                        {recipe.map((content, index) => {
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
                                    src={recipe.image}
                                    alt={recipe.title}
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
