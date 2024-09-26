import classes from "./Recipe.module.sass";

import {Link, useLoaderData} from "react-router-dom";
import {MultiContainer} from "../../UI/container/MultiContainer.jsx";
import parse from "html-react-parser";
import {Typography} from "../../UI/Typography/Typography.jsx";
import {Breadcrumbs} from "../../UI/breadcrumbs/Breadcrumbs.jsx";
import {useTranslation} from "react-i18next";
import {ArrowRightMoreIcon} from "../../assets/Icons/ArrowRightMoreIcon.jsx";
export const Recipe = () => {

    const recipe = useLoaderData()
    const {t} = useTranslation();

    return (
        <MultiContainer>
            <Breadcrumbs currentPage={recipe.product_title}/>
            <div className={classes.recipe}>
                <div className={classes.recipeImage}>
                    <img src={recipe.detail_image} alt={recipe.product_title} />
                </div>
                <div className={classes.recipeContent}>
                    <div>
                        <Typography className={classes.recipeTitle} variant="h3">
                            {recipe.product_title}
                        </Typography>
                        <div className={classes.recipeText}>
                            {parse(recipe.description)}
                        </div>
                    </div>
                    <Link
                        to={recipe.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button
                            className={classes.recipeLink}
                        >
                            {t("aboutUs.viewRecipe")}
                            <ArrowRightMoreIcon height="24px" width="24px" color="white"/>
                        </button>
                    </Link>
                </div>
            </div>
        </MultiContainer>
    )
}