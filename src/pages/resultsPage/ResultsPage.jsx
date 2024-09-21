import classes from "./ResultsPage.module.sass";

import { useLoaderData, useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from "../../modules/CatalogModule/components/ProductCard/ProductCard.jsx";
import { MultiContainer } from "../../UI/container/MultiContainer.jsx";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {Typography} from "../../UI/Typography/Typography.jsx";
import {Breadcrumbs} from "../../UI/breadcrumbs/Breadcrumbs.jsx";

export const ResultsPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const search = useLoaderData();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [searchInput, setSearchInput] = useState(query);

    const filteredProducts = search.results.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchInput.trim() !== '') {
            e.preventDefault();
            navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
        }
    };

    const handleSearchClick = () => {
        if (searchInput.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
        }
    };

    const clearInput = () => {
        setSearchInput('');
    };

    return (
        <MultiContainer>
            <Breadcrumbs currentPage={t("header.search")}/>
            <div className={classes.search}>
                <div className={classes.searchPage}>
                    <Typography variant="h3">{t("header.search")}</Typography>
                    <div className={classes.inputContainer}>
                        <span className={classes.icon} onClick={handleSearchClick}></span>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder={t('header.search')}
                            className={classes.inputField}
                            onKeyDown={handleKeyDown}
                        />
                        {searchInput && (
                            <span className={classes.clearIcon} onClick={clearInput}>
                                &times;
                            </span>
                        )}
                    </div>
                </div>
                <div>
                   <div className={classes.catalogPage}>
                       {filteredProducts.length > 0 ? (
                           filteredProducts.map((product) => (
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
                </div>
            </div>
        </MultiContainer>
    );
};
