"use client";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import BeforeAfterMasonry from "../BeforeAfterSlider/BeforeAfterMasonry";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ReactPlayer from "react-player/youtube";

export default function VideoGallery({ galleryData }) {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
  if (!galleryData) return null;

  return (
    <Section>
      <div className="grid">
        {galleryData.map((item, index) => (
          <div key={index} className="image-container">
            {hasWindow && (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${item.youtube_id}`}
                width="100%"
                height="100%"
                controls={true}
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

const Section = styled.section`
  padding-top: 24px;
  background: var(--dark-surface-container-highest);
  .tabs-wrapper {
    .MuiTabs-flexContainer {
    }

    button {
      border-bottom: 1px solid var(--light-outline-variant);
    }
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0 0 24px 0;
    margin: 0 16px;
    gap: 16px;
    @media (max-width: 1366px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  }
  .image-container {
    position: relative;
    padding-bottom: 56.25%;
  }
`;
