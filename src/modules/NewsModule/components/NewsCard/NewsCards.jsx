import classes from "./NewsCard.module.sass";

import { useLoaderData, useSearchParams } from "react-router-dom";
import { MultiContainer } from "../../../../UI/container/MultiContainer.jsx";
import { Typography } from "../../../../UI/Typography/Typography.jsx";
import { Pagination } from "../../../../UI/Pagination/Pagination.jsx";
import { useEffect, useState } from "react";
import { NewsModal } from "../NewsModal/NewsModal.jsx";
import {Breadcrumbs} from "../../../../UI/breadcrumbs/Breadcrumbs.jsx";
import {useTranslation} from "react-i18next";

export const NewsCards = () => {
    const {t} = useTranslation();
    const newsPage = useLoaderData();
    const [news, setNews] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedNewsId, setSelectedNewsId] = useState(null);


    const handlePageChange = (page) => {
        setSearchParams({ page });
    };

    const handleCardClick = (newsId) => {
        setSelectedNewsId(newsId);
    };

    const closeModal = () => {
        setSelectedNewsId(null);
    };

    useEffect(() => {
        const page = searchParams.get("page") || 1;
        setCurrentPage(Number(page));
        setNews(newsPage.results);
        setTotalPages(newsPage.total_pages);
    }, [newsPage, searchParams]);

    return (
        <MultiContainer>
            <Breadcrumbs currentPage={t("header.news")}/>
            <Typography className={classes.newsTitle} variant="h3">{t("header.news")}</Typography>
            <div className={classes.news}>
                {news.map((item, index) => (
                    <div
                        className={classes.newsCard}
                        key={index}
                        onClick={() => handleCardClick(item.id)}
                    >
                        <div>
                            <img src={item?.image} alt="" />
                        </div>
                        <div className={classes.newsContentTen}>
                            <p className={classes.newsContent}>
                                {item?.title}
                            </p>
                        </div>
                    </div>
                ))}
                {totalPages > 1 && (
                    <Pagination
                        total={totalPages}
                        current={currentPage}
                        onChange={handlePageChange}
                    />
                )}
            </div>
            {selectedNewsId && <NewsModal newsId={selectedNewsId} onClose={closeModal} />}
        </MultiContainer>
    );
};
