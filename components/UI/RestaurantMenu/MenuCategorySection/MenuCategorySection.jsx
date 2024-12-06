import React from "react";
import styled from "@emotion/styled";
import SingleSection from "./SingleSection/SingleSection";
function MenuCategorySection({ className, menuDataArray }) {
  const singleSection = menuDataArray.map((item, index) => {
    return <SingleSection key={index} singleSectionData={item} />;
  });
  return <Container className={`${className} pb-8`}>{singleSection}</Container>;
}

export default MenuCategorySection;
const Container = styled.section`
  width: 100%;
`;
