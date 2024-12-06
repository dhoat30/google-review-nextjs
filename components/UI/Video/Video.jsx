"use client";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import Image from "next/image";
import styled from "@emotion/styled";
import PlayIcon from "../Icons/PlayIcon";
export default function Video({
  videoID,
  placeholderImage,
  className,
  showCompressedImage,
}) {
  const imageURL = showCompressedImage
    ? placeholderImage.sizes.medium_large
    : placeholderImage.url;
  const [videoLoaded, setVideoLoaded] = useState(false); // New state for tracking video load
  console.log(placeholderImage);
  // Function to load and play the video
  const handleImageClick = () => {
    setVideoLoaded(true);
  };
  return (
    <ContainerStyled className={className}>
      <div className="video-wrapper">
        {!videoLoaded && (
          <>
            <div className="video-overlay"></div>
            <Image
              onClick={handleImageClick}
              src={imageURL} // Replace with your placeholder image path
              fill
              sizes="100vw"
              quality="40"
              alt={placeholderImage.alt}
              placeholder="blur" // Add the blur placeholder attribute
              blurDataURL={placeholderImage.sizes.thumbnail}
              priority // Ensure image loads as soon as possible
              style={{
                objectFit: "cover", // cover, contain, none
              }}
            />
            <ButtonStyled onClick={handleImageClick}>
              <PlayIcon />
            </ButtonStyled>
          </>
        )}

        {videoLoaded && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoID}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
            width="100%"
            height="100%"
            controls={true}
          />
        )}
      </div>
    </ContainerStyled>
  );
}
const ContainerStyled = styled.div`
  position: relative;
  .video-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--light-outline-variant);
  }
  .video-overlay {
    background: var(--dark-surface-container-lowest);
    opacity: 0.1;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 8;
  }
  .img-wrapper {
    img {
      object-fit: cover;
    }
  }
`;
const ButtonStyled = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  svg {
    &:hover {
      cursor: pointer;
    }
    width: 72px;
    height: 72px;
    cursor: pointer;
    circle {
      stroke: white !important;
    }
    path {
      fill: white;
    }
  }
`;
