import { useRef } from "react";
import classes from "./HeaderMobile.module.sass";
import { Link } from "react-router-dom";
import { SearchInput } from "../SearchInput/SearchInput.jsx";
import { Typography } from "../../../../UI/Typography/Typography.jsx";
import { useTranslation } from "react-i18next";
import { useOutsideClick } from "../../../../utils/hooks/useOutsideClick.js";

export const HeaderMobile = ({ navbarItems, searchText, setSearchText, menuOpen, toggleMenu }) => {
    const { t } = useTranslation();
    const menuRef = useRef(null);  // Create a ref for the mobile menu


    useOutsideClick(menuRef, () => {
        if (menuOpen) toggleMenu();
    });

    return (
        <div ref={menuRef} className={`${classes.mobileMenu} ${menuOpen ? classes.open : ""}`}>
            <div className={classes.mobileMenuHeader}>
                <button className={classes.burgerClose} onClick={toggleMenu}>
                    &#x2715;
                </button>
            </div>
            <SearchInput value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <ul className={classes.mobileNavbar}>
                {navbarItems.map((item) => (
                    <li key={item.id}>
                        {item.action ? (
                            <div onClick={item.action} className={classes.navItem}>
                                <Typography variant="body" color="black">
                                    {item.title}
                                </Typography>
                            </div>
                        ) : (
                            <Link to={item.caption}>
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
