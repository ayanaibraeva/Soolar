import classes from "./HitProducts.module.sass";

import { MultiContainer } from "../../../../UI/container/MultiContainer.jsx";
import { useLoaderData } from "react-router-dom";
import Slider from "../Slide/Slide.jsx";
import {Typography} from "../../../../UI/Typography/Typography.jsx";

export const HitProducts = () => {
    const { hitProducts } = useLoaderData();

    const hitOfSalesProducts = hitProducts?.results.filter(product => product.hit_of_sales === true);

    const hitOfSalesInfo = hitOfSalesProducts.map(product => ({
        name: product.name,
        image: product.image,
        description: product.description
    }));

    return (
        <MultiContainer>
            <div className={classes.slider}>
                <Typography variant="h2" >Топовые продукты</Typography>
                <Slider slides={hitOfSalesInfo} />
            </div>
        </MultiContainer>
    );
};
