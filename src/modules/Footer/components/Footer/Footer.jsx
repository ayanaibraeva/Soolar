import classes from "./Footer.module.sass";

import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {Typography} from "../../../../UI/Typography/Typography.jsx";
import {useNavbar} from "../../../../utils/lib/utils.js";
import {LogoFooterIcon} from "../../../../assets/Icons/LogoFooterIcon.jsx";
import {MultiContainer} from "../../../../UI/container/MultiContainer.jsx";
import {FooterContacts} from "../FooterContacts/FooterContacts.jsx";
import {useTranslation} from "react-i18next";

export const Footer = () => {

    const navbarItems = useNavbar();
    const { footer } = useLoaderData();

    const navigate = useNavigate();

    const {t} = useTranslation();
    const handleClick = (id) => {
        navigate(`/catalogDetail/${id}`);
    };
    return(
        <footer className={classes.footer}>
            <MultiContainer>
                <div className={classes.footerContent}>
                    <div className={classes.footerContentLogo}>
                        <Link
                            to={"/"}
                        >
                            <LogoFooterIcon />
                        </Link>
                    </div>
                    <div>
                        <ul className={classes.navbar}>
                            {navbarItems.map((item) => (
                                item.id !== 3 && (
                                    <li key={item.id}> {/* Добавлен key */}
                                        {item.action ? (
                                            <div onClick={item.action} className={classes.navItem}>
                                                <Typography variant="bodyL" color="black">
                                                    {item.title}
                                                </Typography>
                                            </div>
                                        ) : (
                                            <Link to={item.caption}>
                                                <Typography variant="bodyL" color="black">
                                                    {item.title}
                                                </Typography>
                                            </Link>
                                        )}
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>
                    <div>
                        <Link
                            className={classes.catalog}
                            to={"/catalog"}
                        >
                            {t("catalog.catalog")}
                        </Link>
                        <div className={classes.catalogList}>
                            {footer.map((item) => (
                                <ul key={item.id}> {/* Добавлен key */}
                                    <li onClick={() => handleClick(item.id)}>
                                        {item.name}
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                    <FooterContacts/>
                </div>
            </MultiContainer>
        </footer>
    )
}
