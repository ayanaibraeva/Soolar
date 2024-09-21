import classes from "./FooterContacts.module.sass";

import { Link, useLoaderData } from "react-router-dom";

import { Typography } from "../../../../UI/Typography/Typography.jsx";
import {  WhatsAppIcon } from "../../../../assets/Icons/WhatsAppIcon.jsx";
import { InstagramIcon } from "../../../../assets/Icons/InstagramIcon.jsx";
import { FacebookIcon } from "../../../../assets/Icons/FacebookIcon.jsx";
import { TelegramIcon } from "../../../../assets/Icons/TelegramIcon.jsx";
import {useTranslation} from "react-i18next";

export const FooterContacts = () => {
    const { address, phone1, phone2, instagram, facebook, telegram, whatsapp } = useLoaderData();
    const {t} = useTranslation();

    return (
        <div className={classes.social}>
           <div className={classes.socialContent}>
               <Typography variant="bodyL">{t("footer.address")}:</Typography>
               <Typography>{address}</Typography>
           </div>
            <div className={classes.socialContent}>
                <Typography variant="bodyL">{t("footer.contacts")}:</Typography>
                <a className={classes.tel} href={`tel:${phone1}`}>{phone1}</a>
                {/*<a className={classes.tel} href={`tel:${phone2}`}>{phone2}</a>*/}
            </div>
            <div className={classes.socialContent}>
                <Typography variant="bodyL">{t("footer.socialMedia")}:</Typography>
                {[{ link: instagram, Icon: InstagramIcon }, { link: facebook, Icon: FacebookIcon }, { link: telegram, Icon: TelegramIcon }, { link: whatsapp, Icon: WhatsAppIcon }]
                    .map(({ link, Icon }, index) => (
                        <Link key={index} to={link} target="_blank">
                            <Icon />
                        </Link>
                    ))}
            </div>
        </div>
    );
};
