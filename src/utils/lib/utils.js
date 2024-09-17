import {PATH} from "./variables.js";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const useNavbar = (onContactsClick) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleRecipesClick = () => {
        navigate(PATH.aboutUs, { state: { scrollToHazelnut: true } });
    };

    return [
        {
            id: 1,
            title: t("header.aboutUs"),
            caption: PATH.aboutUs,
        },
        {
            id: 2,
            title: t("header.recipes"),
            action: handleRecipesClick,
        },
        {
            id: 3,
            title: t("header.catalog"),
            caption: PATH.catalog,
        },
        {
            id: 4,
            title: t("header.news"),
            caption: PATH.news,
        },
        {
            id: 5,
            title: t("header.contacts"),
            action: onContactsClick,
        }
    ];
};
