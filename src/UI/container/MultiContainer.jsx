import classes from "./MultiContainer.module.sass";
export const MultiContainer = ({children}) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};