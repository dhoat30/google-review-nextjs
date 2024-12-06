import styled from "@emotion/styled";
import React from "react";
import Image from "next/image";
export default function JustImageHero({ desktopImage }) {
  return (
    <Section
      style={{
        paddingBottom: `${(desktopImage?.height / desktopImage?.width) * 100}%`,
      }}
    >
      {desktopImage && (
        <Image src={desktopImage?.url} alt="Project hero image" fill />
      )}
    </Section>
  );
}
const Section = styled.section`
  position: relative;
  width: 100%;
`;
