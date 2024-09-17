import classes from "./Footer.module.sass";

import {Link} from "react-router-dom";
import {Typography} from "../../../../UI/Typography/Typography.jsx";
import {useNavbar} from "../../../../utils/lib/utils.js";
import {LogoFooterIcon} from "../../../../assets/Icons/LogoFooterIcon.jsx";
import {MultiContainer} from "../../../../UI/container/MultiContainer.jsx";
import {FooterContacts} from "../FooterContacts/FooterContacts.jsx";

export const Footer = () => {

    const navbarItems = useNavbar();

    return(
        <footer className={classes.footer}>
            <MultiContainer>
                <div className={classes.footerContent}>
                    <Link
                        to={"/"}
                    >
                        <LogoFooterIcon />
                    </Link>
                    <div>
                        <ul className={classes.navbar}>
                            {navbarItems.map((item) => (
                                item.id !== 3 && (
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
                                )
                            ))}
                        </ul>

                    </div>
                    <FooterContacts/>
                </div>
            </MultiContainer>
        </footer>
    )
}
