import classes from "./Loader.module.sass";

import LoaderSvg from "../../assets/Icons/Loader.svg";

export const Loader = () => {
    return (
        <div className={classes.loader}>
            <img src={LoaderSvg} alt="Loading..." />
        </div>
    );
};
