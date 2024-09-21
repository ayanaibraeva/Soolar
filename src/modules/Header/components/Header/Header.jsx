import classes from "./Header.module.sass";

import {Link, useLoaderData} from "react-router-dom";
import { useState } from "react";
import { useNavbar } from "../../../../utils/lib/utils.js";
import { useTranslation } from "react-i18next";
import { LogoHeaderIcon } from "../../../../assets/Icons/LogoHeaderIcon.jsx";
import { HeaderSelect } from "../HeaderSelect/HeaderSelect.jsx";
import {HeaderMobile} from "../HeaderMobile/HeaderMobile.jsx";
import {SearchInput} from "../SearchInput/SearchInput.jsx";
import {MultiContainer} from "../../../../UI/container/MultiContainer.jsx";
import {Typography} from "../../../../UI/Typography/Typography.jsx";

export const Header = ({ onContactsClick }) => {
    const {linkContacts} = useLoaderData();
    const navbarItems = useNavbar(onContactsClick);
    const [searchText, setSearchText] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const { t } = useTranslation();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={classes.header}>
            <MultiContainer>
                <div className={`${classes.headerContent} ${menuOpen ? classes.headerContentHidden : ""}`}>
                    <button className={classes.burgerIcon} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <Link to="/">
                        <LogoHeaderIcon />
                    </Link>

                    <ul className={classes.navbar}>
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

                    <div className={classes.headerRight}>
                        <div className={classes.searchInput}>
                            <SearchInput value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                        <HeaderSelect />
                            <button
                                className={classes.headerButton}
                                onClick={() => window.open(linkContacts?.contact_link, "_blank")}
                            >
                                {t("header.contact")}
                            </button>
                    </div>
                </div>
                <HeaderMobile
                    navbarItems={navbarItems}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    menuOpen={menuOpen}
                    toggleMenu={toggleMenu}
                    onContactsClick={onContactsClick}
                />
            </MultiContainer>
        </header>
    );
};
