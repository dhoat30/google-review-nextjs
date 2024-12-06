import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import styled from "@emotion/styled";

export default function TextLink({ label, url, color, className, size }) {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    controls.start({
      width: "100%", // Expand the underline width to 100%
      transition: { duration: 0.2, type: "tween" }, // Set a transition duration
    });

    setIsHovered(true); // Set hover state to true
  };

  const handleMouseLeave = () => {
    controls.start({
      width: "0%", // Reset the underline width to 0%
    });

    setIsHovered(false); // Set hover state to true
  };

  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 0.2,
        type: "tween",
      },
    },
  };
  const arrowVariants = {
    hidden: {
      x: "-60px",
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.2,
        type: "tween",
      },
    },
  };

  //   link animation - in view
  const linkAnimation = {
    offscreen: {
      opacity: 0,
      y: "20px",
    },
    onscreen: {
      opacity: 1,
      y: "0",
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: "all" }}
      variants={linkAnimation}
    >
      <Container
        href={url}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Typography
          component={motion.div}
          variant={size === "sm" ? "body1" : "body1"}
          className="label"
          color={color ? color : "white"}
        >
          {label}
          <motion.span
            className="underline"
            style={{ backgroundColor: color ? color : "white" }}
            animate={controls}
            // Initial width is 0 to hide the underline
          ></motion.span>
        </Typography>
        {!isHovered ? (
          <svg
            width={size === "sm" ? "20" : "20"}
            viewBox="0 0 93 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M59 4L88 33L59 62"
              stroke={color ? color : "white"}
              strokeWidth="7"
              strokeLinecap="round"
              style={{ transform: "translateX(-60px)" }}
            />
            <path
              d="M4 33H87"
              stroke={color ? color : "white"}
              strokeWidth="0"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <motion.svg
            width={size === "sm" ? "20" : "25"}
            viewBox="0 0 93 66"
            fill="none"
            xmlns="http://www.w3.org/2000/motion.svg"
          >
            <motion.path
              d="M59 4L88 33L59 62"
              stroke={color ? color : "white"}
              strokeWidth="7"
              strokeLinecap="round"
              variants={arrowVariants}
              initial="hidden"
              animate="visible"
            />

            <motion.path
              initial="hidden"
              animate="visible"
              variants={pathVariants}
              d="M4 33H87"
              stroke={color ? color : "white"}
              strokeWidth="7"
              strokeLinecap="round"
            />
          </motion.svg>
        )}
      </Container>
    </motion.div>
  );
}

const Container = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  div {
    font-weight: 400;
    display: inline-block;
    position: relative;
  }

  .underline {
    position: absolute; /* Position the pseudo-element relative to the parent span */
    bottom: -8px;
    left: 0;
    width: 0%; /* Initial width is 0% to hide the underline */
    height: 2px; /* Set the desired height for the underline */
  }
  @media (max-width: 600px) {
    .label {
      font-size: 1rem;
    }
    svg {
      width: 20px;
    }
  }
`;
