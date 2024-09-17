import classes from "./NewsMain.module.sass";

import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MultiContainer } from "../../../UI/container/MultiContainer.jsx";
import { Typography } from "../../../UI/Typography/Typography.jsx";
import {CustomMoreButton} from "../../../UI/CustomMoreButton/CustomMoreButton.jsx";
import {useTranslation} from "react-i18next";

export const NewsMain = () => {
    const {newsPage} = useLoaderData();
    const [news, setNews] = useState([]);
    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        setNews(newsPage.results.slice(0, 4));
    }, [newsPage]);

    const handleCardClick = () => {
        navigate(`/news`);
    };

    return (
        <MultiContainer>
            <Typography className={classes.newsTitle} variant="h2">{t("aboutUs.news")}</Typography>
            <div className={classes.new}>
                {news.map((item, index) => (
                    <div
                        className={`${classes.newsCard} ${index === 0 ? classes.firstCard : ''}`}
                        key={index}
                        onClick={() => handleCardClick(item.id)}
                    >
                        <div>
                            <img src={item?.image} alt={item?.title || "News Image"} />
                        </div>
                        <div className={classes.newsContentTen}>
                            <p className={classes.newsContent}>
                                {item?.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {news.length > 0 && (
                <CustomMoreButton
                    onClick={handleCardClick}
                />
            )}
        </MultiContainer>
    );
};
