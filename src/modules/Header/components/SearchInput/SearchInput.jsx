import classes from "./SearchInput.module.sass"
import {useTranslation} from "react-i18next";
export const  SearchInput = ({ value, onChange }) => {

    const {t} = useTranslation();

    return(
        <div className={classes.inputContainer}>
            <span className={classes.icon}></span>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={t("header.search")}
                className={classes.inputField}
            />
        </div>
    )
}