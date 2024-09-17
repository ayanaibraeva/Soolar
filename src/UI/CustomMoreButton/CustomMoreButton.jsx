import classes from "./CustomMoreButton.module.sass";

import {ArrowRightMoreIcon} from "../../assets/Icons/ArrowRightMoreIcon.jsx";
import {useTranslation} from "react-i18next";

export const CustomMoreButton = ({onClick}) => {

    const {t} = useTranslation();

    return(
        <div className={classes.more}>
            <button className={classes.button} onClick={onClick}>
                {t("aboutUs.moreButton")}
                <ArrowRightMoreIcon height="22px" color="#4DB45E" width="22px"/>
            </button>
        </div>
    )
}