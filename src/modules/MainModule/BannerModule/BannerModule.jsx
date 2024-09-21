import classes from "./Banner.module.sass";
import { useLoaderData } from "react-router-dom";

export const BannerModule = () => {
    const { banner } = useLoaderData();
    const video = banner.video;
    const image = banner.image;

    return (
        <div className={classes.banner}>
            {video ? (
                <video autoPlay muted playsInline loop className={classes.video}>
                    <source src={video} type="video/mp4" />
                    <track
                        src="captions_en.vtt"
                        kind="captions"
                        srcLang="en"
                        label="english_captions"
                    />
                </video>
            ) : (
                <img src={image} alt="Banner" className={classes.image} />
            )}
            <div className={classes.overlay} />
        </div>
    );
};
