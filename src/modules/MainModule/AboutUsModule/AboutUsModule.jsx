import classes from "./AboutUs.module.sass";

import {Typography} from "../../../UI/Typography/Typography.jsx";
import {MultiContainer} from "../../../UI/container/MultiContainer.jsx";
import {useLoaderData} from "react-router-dom";
import {useTranslation} from "react-i18next";
import parse from "html-react-parser";

export const AboutUsModule = () => {

    const { aboutUs } = useLoaderData();
    const { t } = useTranslation();

    if (!aboutUs || !aboutUs.text || !aboutUs.image) {
        return null
    }

    return (
        <MultiContainer>
            <div className={classes.aboutUs}>
                <div className={classes.aboutUsContent}>
                    <Typography variant="h2" className={classes.aboutUsTitle}>
                        {t("aboutUs.whoAreWe")}
                    </Typography>
                    <div className={classes.aboutUsContentText}>
                        {parse(aboutUs.text)}
                    </div>
                </div>
                <div className={classes.image}>
                    <img src={aboutUs.image} alt=""/>
                </div>
            </div>
        </MultiContainer>
    )
}