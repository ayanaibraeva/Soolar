import { Link } from "react-router-dom";
import classes from "./CustomButton.module.sass";
import { Typography } from "../Typography/Typography.jsx";

const buttonStyles = {
    orange: classes.customButtonOrange,
    green: classes.customButtonGreen
};
export const CustomButton = ({ text, icon, to, onClick, actionType, buttonStyle, type, style, disabled, className, target, rel, isBig}) => {
    const ButtonComponent = actionType === "link" ? Link : "button";
    const buttonClassName = `${classes.customButton} ${buttonStyles[buttonStyle] || classes.customButtonGrey} ${className}`;
    const typeProps = actionType === "link" ? { to, target, rel } : { onClick, type, disabled };


    return (
        <ButtonComponent disabled={disabled} {...typeProps} className={`${classes.customButton} ${buttonClassName} ${isBig? classes.mainButton: ""} `} style={style}>
            <Typography variant="button">{text}</Typography>
            {icon && icon}
        </ButtonComponent>
    );
};
