"use client";
import React from "react";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import BreadcrumbHero from "../Hero/BreadcrumbHero";
export default function HtmlPageTemplate({ pageData }) {
  if (!pageData) return null;
  return (
    <>
      <BreadcrumbHero title={pageData.title.rendered} />
      <ContainerStyled maxWidth="lg">
        <Box className="content">
          <Typography
            className="body1"
            variant="body1"
            component="div"
            dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
          ></Typography>
        </Box>
      </ContainerStyled>
    </>
  );
}
const TitleWrapper = styled.div`
  text-align: center;
  flex-direction: column;
  background: var(--light-surface-container);
  border-bottom: 1px solid var(--light-outline);
  padding-top: 120px;
  padding-bottom: 24px;
`;
const ContainerStyled = styled(Container)`
  padding-bottom: 40px;
  .content {
    strong {
    }
    h2 {
      font-size: 2rem;
      margin-top: 24px;
    }
    h3 {
      font-size: 1.5rem;
      margin-top: 24px;
    }
    p {
    }
  }
`;
