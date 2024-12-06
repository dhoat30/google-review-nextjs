import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

import TextLink from "../CTA/TextLink";

export default function RowCard({
  title,
  description,
  image,
  className,
  ctaLink,
  ctaLabel,
}) {
  // animation control for the bulb in the background
  const controls = useAnimation();

  const handleMouseEnter = () => {
    controls.start({
      width: "100%",
      height: "100%",
      // background:
      //   "linear-gradient(180deg, rgba(151, 71, 255, 0.00) 0%, rgba(151, 71, 255, 0.67) 100%)",
      transition: { duration: 0.2, type: "tween" }, // Set a transition duration
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      width: 0,
      height: 0,
      background: "none",
      boxShadow: "none",
      transition: { duration: 0.2, type: "tween" }, // Set a transition duration
    });
  };

  // scroll animation for title, description and image
  const textVariation = {
    offscreen: {
      opacity: 0,
      y: "20px",
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  };
  const imageVariation = {
    offscreen: {
      opacity: 0,
      y: "20px",
    },
    onscreen: {
      opacity: 1,
      y: 0,

      transition: { ease: "easeInOut", duration: 0.5 },
    },
  };

  return (
    <Container
      className={`${className} row`}
      whileHover={{
        transition: { duration: 0.2 },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className="bulb" animate={controls}></motion.div>
      <div className="wrapper">
        <Box className="content-wrapper">
          <Typography
            component={motion.h2}
            variant="h4"
            color="white"
            className=" title"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: "all" }}
            variants={textVariation}
          >
            {title}
          </Typography>
          <Typography
            component={motion.p}
            variant="h6"
            className="description "
            color="var(--dark-on-surface)"
            dangerouslySetInnerHTML={{ __html: description }}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: "all" }}
            variants={textVariation}
          />

          <TextLink label={ctaLabel} url={ctaLink} className="cta" />
        </Box>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: "all" }}
          variants={imageVariation}
          className="image-wrapper"
          style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}
        >
          <Image
            src={image.url}
            alt={title}
            fill
            priority
            sizes="(max-width: 1080px) 100vw, 50vw "
          />
        </motion.div>
      </div>
    </Container>
  );
}

const Container = styled(motion.div)`
  cursor: pointer;
  position: relative;
  z-index: 1;
  width: 100%;
  grid-column: span 2;
  .bulb {
    position: absolute;
    z-index: -2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
  }
  .wrapper {
    padding: 24px 0 0 0;
    border-radius: 12px;
    border: 1px solid #353438;
    background: rgba(53, 52, 56, 0.1);
    backdrop-filter: blur(7.599999904632568px);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(1, 1fr);
      padding: 0 0 0 0;
      gap: 16px;
    }
    .content-wrapper {
      padding: 40px 32px;
      @media (max-width: 600px) {
        padding: 32px 16px 16px 16px;
      }
      .description {
        margin: 16px 0 0 0;
        p {
          margin-bottom: 24px;
          strong {
            font-weight: 500;
            color: var(--dark-secondary);
          }
        }
      }
      .cta {
      }
    }
    .image-wrapper {
      position: relative;
      width: 100%;

      img {
        object-fit: cover;
        border-radius: 12px;
      }
    }
  }
`;
