import classes from "./ResultsPage.module.sass";

import { useLoaderData, useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from "../../modules/CatalogModule/components/ProductCard/ProductCard.jsx";
import { MultiContainer } from "../../UI/container/MultiContainer.jsx";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from "../../UI/Typography/Typography.jsx";
import { Breadcrumbs } from "../../UI/breadcrumbs/Breadcrumbs.jsx";
import {Pagination} from "../../UI/Pagination/Pagination.jsx";


export const ResultsPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const search = useLoaderData();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const page = searchParams.get('page') || 1;
    const [searchInput, setSearchInput] = useState(query);

    const clearInput = () => {
        setSearchInput('');
    };

    const handleSearchClick = () => {
        if (searchInput) {
            navigate(`/search?query=${searchInput}&page=1`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchInput) {
            navigate(`/search?query=${searchInput}&page=1`);
        }
    };

    const handlePageChange = (newPage) => {
        navigate(`/search?query=${query}&page=${newPage}`);
    };

    return (
        <MultiContainer>
            <Breadcrumbs currentPage={t("header.search")} />
            <div className={classes.search}>
                <div className={classes.searchPage}>
                    <Typography variant="h3">{t("header.search")}</Typography>
                    <div className={classes.inputContainer}>
                        <span
                            className={classes.icon}
                            onClick={handleSearchClick}>
                        </span>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder={t('header.search')}
                            className={classes.inputField}
                            onKeyDown={handleKeyDown}
                        />
                        {searchInput && (
                            <span
                                className={classes.clearIcon}
                                onClick={clearInput}>
                                &times;
                            </span>
                        )}
                        <button
                            onClick={handleSearchClick}
                            className={classes.searchButton}
                        >
                            {t("header.search")}
                        </button>
                    </div>
                </div>
                <div>
                    <div className={classes.catalogPage}>
                        {search.results.length > 0 ? (
                            search.results.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <Typography
                                className={classes.text}
                                variant="body600"
                            >
                                {t('noResults.searchFor')} "{query}" {t('noResults.nothingFound')}
                            </Typography>
                        )}
                    </div>

                    {search.total_pages > 1 && (
                        <Pagination
                            total={search.total_pages}
                            current={parseInt(page)}
                            onChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </MultiContainer>
    );
};
