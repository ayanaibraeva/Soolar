import classes from "./Banner.module.sass";

import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export const BannerModule = () => {
    const { banner } = useLoaderData();
    const video = banner.video;
    const image = banner.image;
    const mobileImg = banner.mobi_image;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 430);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const backgroundImage = isMobile ? mobileImg : image;

    return (
        <div
            className={classes.banner}
            style={{ backgroundImage: video ? 'none' : `url(${backgroundImage})` }}
        >
            {video && (
                <video autoPlay muted playsInline loop className={classes.video}>
                    <source src={video} type="video/mp4" />
                    <track
                        src="captions_en.vtt"
                        kind="captions"
                        srcLang="en"
                        label="english_captions"
                    />
                </video>
            )}
            <div className={classes.overlay} />
        </div>
    );
};
