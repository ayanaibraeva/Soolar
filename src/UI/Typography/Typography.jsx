import classes from "./Typography.module.sass";

export const Typography = (props) => {
    const {
        variant,
        color = "",
        weight = "",
        className,
        children,
        id,
        onClick,
    } = props;

    const Tags = {
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        button: "p",
        body: "p",
        body600: "p",
        extraSmallBody: "p",
        span: "span"
    };

    const classNamedGenerated = [
        classes[variant],
        classes[color],
        classes[weight],
        className
    ]
        .join(" ")
        .trim();

    const TagName = Tags[variant in Tags ? variant : "body"];

    return (
        <TagName id={id} className={classNamedGenerated} onClick={onClick}>
            {children}
        </TagName>
    );
};
