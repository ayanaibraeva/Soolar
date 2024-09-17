import classes from "./Breadcrumbs.module.sass";

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {Typography} from "../Typography/Typography.jsx";
import {BreadIcon} from "../../assets/Icons/BreadIcon.jsx";

export const Breadcrumbs = ({ currentPage, parentPageLink, currentPageId, className }) => {

    const { t } = useTranslation();

    const crumbs = [];

    crumbs.push(
        <li key="main">
            <NavLink to={"/"}>
                <Typography variant="body600" color="black">
                    {t("header.main")}
                </Typography>
            </NavLink>
        </li>
    );

    crumbs.push(
        <li key="icon1">
            <BreadIcon/>
        </li>
    );

    if (currentPage && parentPageLink) {
        crumbs.push(
            <li key="currentLink">
                <NavLink to={parentPageLink}>
                    <Typography className={classes.breadcrumbTitle} variant="body600" color="black" >
                        {currentPage}
                    </Typography>
                </NavLink>
            </li>
        );

        crumbs.push(
            <li key="icon2">
                <BreadIcon/>
            </li>
        );

        crumbs.push(
            <li key="currentTitle">
                <Typography variant="body600" color="black" >
                    {currentPageId}
                </Typography>
            </li>
        );

    } else if (currentPage) {
        crumbs.push(
            <li key="currentTitle">
                <Typography variant="body600" color="black" >
                    {currentPage}
                </Typography>
            </li>
        );
    }

    return <ul className={`${classes.breadcrumbList} ${className}`}>{crumbs}</ul>;

};


