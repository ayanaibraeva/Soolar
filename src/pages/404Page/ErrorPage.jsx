import {Typography} from "../../UI/Typography/Typography.jsx";
import {ArrowRightMoreIcon} from "../../assets/Icons/ArrowRightMoreIcon.jsx";
import classes from "./ErrorPage.module.sass";
import {MultiContainer} from "../../UI/container/MultiContainer.jsx";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

export const ErrorPage = () => {

    const {t} = useTranslation();

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }
    return(
        <MultiContainer>
            <div className={classes.error}>
                <span>404</span>
                <Typography variant="h3" color="main">{t("error.404")}</Typography>
                <button className={classes.button} onClick={handleClick}>
                    {t("error.main")}
                    <ArrowRightMoreIcon height="22px" color="#4DB45E" width="22px"/>
                </button>
            </div>
        </MultiContainer>
    )
}