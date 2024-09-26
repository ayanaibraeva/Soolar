import classes from "./HeaderMobile.module.sass";

import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchInput } from "../SearchInput/SearchInput.jsx";
import { Typography } from "../../../../UI/Typography/Typography.jsx";
import { useTranslation } from "react-i18next";
import { useOutsideClick } from "../../../../utils/hooks/useOutsideClick.js";

export const HeaderMobile = ({ navbarItems, searchText, setSearchText, menuOpen, toggleMenu }) => {
    const { t } = useTranslation();
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useOutsideClick(menuRef, () => {
        if (menuOpen) toggleMenu();
    });

    const handleNavigation = (path) => {
        navigate(path);
        toggleMenu();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            toggleMenu();
        }
    };

    return (
        <div ref={menuRef} className={`${classes.mobileMenu} ${menuOpen ? classes.open : ""}`}>
            <div className={classes.mobileMenuHeader}>
                <button className={classes.burgerClose} onClick={toggleMenu}>
                    &#x2715;
                </button>
            </div>
            <div className={classes.searchInput}>
                <SearchInput
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <ul className={classes.mobileNavbar}>
                {navbarItems.map((item) => (
                    <li key={item.id}>
                        {item.action ? (
                            <div onClick={() => { item.action(); toggleMenu(); }} className={classes.navItem}>
                                <Typography variant="body" color="black">
                                    {item.title}
                                </Typography>
                            </div>
                        ) : (
                            <Link
                                to={item.caption}
                                onClick={() => handleNavigation(item.caption)} // Call handleNavigation
                            >
                                <Typography variant="body" color="black">
                                    {item.title}
                                </Typography>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
            <button
                className={classes.headerButton}
                onClick={() => window.open("https://web.whatsapp.com/", "_blank")}
            >
                {t("header.contact")}
            </button>
        </div>
    );
};
