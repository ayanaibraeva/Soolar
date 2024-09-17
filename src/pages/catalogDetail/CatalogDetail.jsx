import classes from "../catalogPage/CatalogPage.module.sass";

import { useLoaderData, useSearchParams } from 'react-router-dom';
import ProductCard from "../../modules/CatalogModule/components/ProductCard/ProductCard.jsx";
import { Typography } from "../../UI/Typography/Typography.jsx";
import { MultiContainer } from "../../UI/container/MultiContainer.jsx";
import { Pagination } from "../../UI/Pagination/Pagination.jsx";
import { useState, useEffect } from 'react';
import {Breadcrumbs} from "../../UI/breadcrumbs/Breadcrumbs.jsx";
import {PATH} from "../../utils/lib/variables.js";
import {useTranslation} from "react-i18next";

export const CatalogDetail = () => {
    const categoryData = useLoaderData();
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const category = categoryData?.results?.catalogs || [];

    useEffect(() => {
        const page = searchParams.get("page") || 1;
        setCurrentPage(Number(page));
        setTotalPages(categoryData.total_pages);
    }, [categoryData, searchParams]);

    const handlePageChange = (page) => {
        setSearchParams({ page });
    };

    return (
        <MultiContainer>
            <div>
                <Breadcrumbs currentPage={t("header.catalog")} parentPageLink={PATH.catalog} currentPageId={categoryData?.results?.name}/>
                <Typography className={classes.title} variant="h3">
                    {categoryData?.results?.name}
                </Typography>
                <div className={classes.catalogPage}>
                    {category.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <Pagination
                        total={totalPages}
                        current={currentPage}
                        onChange={handlePageChange}
                    />
                )}
            </div>
        </MultiContainer>
    );
};
