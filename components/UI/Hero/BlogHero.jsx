"use client";

import React from "react";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Video from "@/components/UI/Video/Video";
import BottomSocialShare from "@/components/UI/SocialShare/BottomSocialShare";
export default function BlogHero({ className, videoID, featuredImage }) {
  return (
    <Wrapper className={className}>
      {videoID ? (
        <div className="video-wrapper">
          <Video placeholderImage={featuredImage} videoID={videoID} />
        </div>
      ) : (
        <div
          className="featured-image-wrapper"
          style={{
            paddingBottom: `${
              (featuredImage.height / featuredImage.width) * 100
            }%`,
          }}
        >
          <Image src={featuredImage.url} fill alt={featuredImage.alt} />
        </div>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .featured-image-wrapper {
    position: relative;
    width: 100%;
  }
`;
