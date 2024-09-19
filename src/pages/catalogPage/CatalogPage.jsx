import classes from "./CatalogPage.module.sass";

import { useLoaderData, useNavigate } from "react-router-dom";
import ProductCard from "../../modules/CatalogModule/components/ProductCard/ProductCard.jsx";
import { Typography } from "../../UI/Typography/Typography.jsx";
import { MultiContainer } from "../../UI/container/MultiContainer.jsx";
import { CustomMoreButton } from "../../UI/CustomMoreButton/CustomMoreButton.jsx";
import { Breadcrumbs } from "../../UI/breadcrumbs/Breadcrumbs.jsx";
import { useTranslation } from "react-i18next";

export const CatalogPage = () => {
    const category = useLoaderData();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleMoreClick = (categoryId) => {
        navigate(`/catalogDetail/${categoryId}`);
    };

    return (
        <MultiContainer>
            <div>
                <Breadcrumbs currentPage={t("catalog.catalog")} />
                <Typography className={classes.pageTitle} variant="h3">{t("catalog.catalog")}</Typography>
                {category.map((item) => (
                    <div key={item.id}>
                        <Typography className={classes.title} variant="h3">{item.name}</Typography>
                        <div className={classes.catalogBlock}>
                            {item.catalogs.length > 0 ? (
                                <div>
                                    <div className={classes.catalogPage}>
                                        {item.catalogs.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                    {item.catalogs.length >= 8 && (
                                        <CustomMoreButton onClick={() => handleMoreClick(item.id)} />
                                    )}
                                </div>
                            ) : (
                                <p>Товары не найдены.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </MultiContainer>
    );
};
