"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Image from "next/image";
import Container from "@mui/material/Container";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Gallery({ galleryData }) {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTablet = useMediaQuery("(max-width:750px)"); // Use 'sm' for small screens

  if (!galleryData) return null;

  // Extract unique tags for the tabs, and add a "Show All" option
  const uniqueTags = [
    { value: "all", label: "All" },
    ...Array.from(
      new Set(galleryData.map((item) => item.tag.value)) // Get unique tag values
    ).map((tagValue) => {
      const tag = galleryData.find((item) => item.tag.value === tagValue)?.tag; // Find the first matching tag object
      return tag;
    }),
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Filter gallery items based on selected tab
  const filteredGalleryData =
    value === 0
      ? galleryData // Show all items if "All" tab is selected
      : galleryData.filter(
          (item) => item.tag.value === uniqueTags[value].value
        );

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <Section>
      {/* Tabs for filtering */}
      <Container maxWidth="xl">
        <Tabs
          value={value}
          onChange={handleChange}
          variant={isTablet ? "scrollable" : "fullWidth"} // Use scrollable on mobile and fullWidth on desktop
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
          textColor="secondary"
          indicatorColor="secondary"
          className="tabs-wrapper"
        >
          {uniqueTags.map((tag, index) => (
            <Tab key={index} label={tag.label} />
          ))}
        </Tabs>

        {/* Filtered gallery grid */}
        <div className="cards-wrapper mt-24">
          {filteredGalleryData.map((item, index) => {
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

        {/* Lightbox Component */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={filteredGalleryData.map((item) => ({
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
  margin-top: 16px;
  .tabs-wrapper {
    .MuiTabs-flexContainer {
    }
    svg {
      path {
        fill: var(--dark-on-surface);
      }
    }
    button {
      border-bottom: 1px solid var(--dark-on-surface);
    }
  }
  .cards-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 24px;
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }
  .image-container {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--light-outline);
    margin-bottom: 24px; /* Adds the row gap */
    break-inside: avoid; /* Ensures no images break in the column layout */
  }
`;
