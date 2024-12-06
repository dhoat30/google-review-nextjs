"use client";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

export default function BreadcrumbHero({
  title,
  description,
  showBreadcrumb = true,
}) {
  return (
    <TitleWrapper className="title-wrapper ">
      <Container maxWidth="md" className="Container">
        {showBreadcrumb && <BreadCrumb className="justify-center" />}

        <div className="title mt-16">
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
          <Typography variant="body1" component="p" className="mt-16">
            {description}
          </Typography>
        </div>
      </Container>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  text-align: center;
  background: var(--dark-surface-container-lowest);
  border-bottom: 1px solid var(--light-outline);
  padding-top: 120px;
  padding-bottom: 40px;
  @media (max-width: 900px) {
    padding-top: 72px;
  }
  .container {
    flex-direction: column;
    display: flex;
    align-items: center;
  }
`;
