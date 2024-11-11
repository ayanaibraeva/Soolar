import classes from "./HitProducts.module.sass";

import { MultiContainer } from "../../../../UI/container/MultiContainer.jsx";
import { useLoaderData } from "react-router-dom";
import Slider from "../Slide/Slide.jsx";
import {Typography} from "../../../../UI/Typography/Typography.jsx";
import {useTranslation} from "react-i18next";

export const HitProducts = () => {
    const { hitProducts } = useLoaderData();
    const hitOfSalesProducts = hitProducts?.results.filter(product => product.hit_of_sales === true);
    const { t } = useTranslation();

    const hitOfSalesInfo = hitOfSalesProducts.map(product => ({
        name: product.name,
        images: product.images,
        description: product.description
    }));

    if (!hitProducts?.results?.length || !hitOfSalesProducts.length) {
        return null;
    }

    return (
        <MultiContainer>
            <div className={classes.slider}>
                <Typography variant="h2" >{t("aboutUs.topProducts")}</Typography>
                <Slider slides={hitOfSalesInfo} />
            </div>
        </MultiContainer>
    );
};
