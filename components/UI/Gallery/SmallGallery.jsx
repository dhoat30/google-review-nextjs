"use client";
import React, { useState } from "react";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import PatternHeading from "../Headings/PatternHeading";
import Image from "next/image";
import Link from "next/link";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import Button from "@mui/material/Button";
import Lightbox from "yet-another-react-lightbox";

export default function SmallGallery({ title, description, galleryData }) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <Section>
      <Container maxWidth="xl">
        <PatternHeading title={title} description={description} centerAlign />
        <div className="cards-wrapper mt-40">
          {galleryData.map((item, index) => {
            if (index > 2) return null;
            return (
              <div
                key={index}
                className="image-wrapper"
                style={{ paddingBottom: `90%` }}
                onClick={() => handleThumbnailClick(index)} // Handle click to open lightbox
              >
                <Image
                  src={item.image.sizes.medium_large}
                  alt={item.image.alt}
                  fill
                  style={{ cursor: "pointer" }} // Add pointer cursor to indicate clickable
                />
              </div>
            );
          })}
        </div>
        <Link href="/gallery" className="cta mt-24">
          <Button
            variant="contained"
            color="secondary"
            endIcon={<CallMadeOutlinedIcon />}
          >
            View More
          </Button>
        </Link>

        {/* Lightbox Component */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={galleryData.map((item) => ({
            src: item.image.sizes.large,
            alt: item.image.alt,
          }))}
          index={currentIndex}
        />
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: var(--dark-surface-container-highest);
  padding: 80px 0;
  @media (max-width: 600px) {
    padding: 40px 0;
  }
  .cards-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 24px;
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
    .image-wrapper {
      position: relative;
      width: 100%;
      img {
        object-fit: cover;
      }
    }
  }
  .cta {
    display: flex;
    justify-content: center;
  }
`;
