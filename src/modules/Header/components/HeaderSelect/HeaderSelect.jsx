import classes from "./HeaderSelect.module.sass";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowDownIcon } from "../../../../assets/Icons/ArrowDownIcon.jsx";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../../../utils/hooks/useOutsideClick.js";

export const HeaderSelect = () => {
    const { i18n } = useTranslation();
    const [activeList, setActiveList] = useState(null);
    const ref = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    useOutsideClick(ref, () => setActiveList(null));

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setActiveList(null);

        const currentPath = location.pathname + location.search;
        navigate(currentPath, { replace: true });
    };

    const languages = [
        { code: "ru", label: "РУС" },
        { code: "en", label: "ENG" },
    ];

    return (
        <div ref={ref} className={classes.headerSelect}>
            <button
                type="button"
                className={classes.selectedOption}
                onClick={() => setActiveList((prev) => !prev)}
            >
                {languages.find((lang) => lang.code === i18n.language)?.label}
                <ArrowDownIcon
                    height="20px"
                    width="20px"
                    color="black"
                    className={`${classes.ArrowDownSvg} ${activeList ? classes.open : ""}`}
                />
            </button>
            <ul className={`${classes.optionList} ${activeList ? classes.open : ""}`}>
                {languages
                    .filter((lang) => lang.code !== i18n.language)
                    .map((lang) => (
                        <li
                            key={lang.code}
                            className={classes.languageOption}
                            onClick={() => changeLanguage(lang.code)}
                        >
                            {lang.label}
                        </li>
                    ))}
            </ul>
        </div>
    );
};
