import { Suspense } from "react";
import Skeleton from "../../Skeleton/Skeleton";
import HeroContent from "./HeroContent";
import styles from './BackgroundImageHero.module.css'
import HeroImage from "./HeroImage";
import Video from "../../Video/Video";
import BeforeAfter from "../../BeforeAfterSlider/BeforeAfter";
import BackgroundVideo from "../../Video/backgroundVideo";
export default async function BackgroundImageHero({ data, heroUSP, className }) {
    if (!data || !data.image) return null
    console.log(data.before_after_images?.after_image)

    const heroData = {
        subtitle: data.subtitle,
        title: data.title,
        description: data.description,
        image: data.image,
        ctaArray: data.buttons,
    };
    let graphicComponent = null;
    if (data.show_video) {
        if (data.video_options === "upload_video") {
            if (data.upload_file) {
                graphicComponent = <BackgroundVideo videoURL={data.upload_file.url} placeholderImage={data.image} />
            }
        }
    }

    else {
        graphicComponent = <HeroImage image={data.image} />
    }
    return (
        <>
            <section className={`${styles.heroSection} ${className}`}>

                {graphicComponent}
                <div className={`${styles.container} max-width-xl`}>
                    <HeroContent title={heroData.title} subtitle={heroData.subtitle} description={heroData.description} ctaArray={heroData.ctaArray} heroUSP={heroUSP} />

                </div>
            </section>


        </>

    )
}