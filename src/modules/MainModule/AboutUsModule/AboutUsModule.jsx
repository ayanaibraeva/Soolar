import classes from "./AboutUs.module.sass";

import {Typography} from "../../../UI/Typography/Typography.jsx";
import {MultiContainer} from "../../../UI/container/MultiContainer.jsx";
import {useLoaderData} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const AboutUsModule = () => {

    const { aboutUs } = useLoaderData();
    const { t } = useTranslation();

    return (
        <MultiContainer>
            <div className={classes.aboutUs}>
                <div>
                    <Typography variant="h2" className={classes.aboutUsTitle}>
                        {t("aboutUs.whoAreWe")}
                    </Typography>
                    <Typography variant="body600">
                        {aboutUs.text}
                    </Typography>
                </div>
                <div className={classes.image}>
                    <img src={aboutUs.image} alt=""/>
                </div>
            </div>
        </MultiContainer>
    )
}