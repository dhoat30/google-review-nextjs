import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
export default function ServiceChecklist({
  title = "Our Process",
  description,
  cards,
}) {
  if (cards.length === 0) return null;
  const checklist = cards.map((card, index) => {
    return (
      <div className="card" key={index}>
        <Typography
          variant="h6"
          component="h3"
          className="title flex align-center gap-4"
          color="var(--light-on-primary-fixed-variant)"
        >
          <CheckBoxOutlinedIcon />
          <span> {card.title}</span>
        </Typography>

        <Typography
          variant="body1"
          component="div"
          className="description mt-8"
          dangerouslySetInnerHTML={{ __html: card.description }}
        />
      </div>
    );
  });
  return (
    <Section>
      <Container maxWidth="xl">
        <div className="grid-wrapper ">
          <div className="title-wrapper">
            <Typography variant="h2" component="h2" className="description">
              {title}
            </Typography>
            {/* add html dangerously  */}

            <Typography
              variant="body1"
              component="p"
              className="description mt-16"
            >
              {description}
            </Typography>
          </div>
          <div className="card-wrapper"> {checklist} </div>
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 80px 0;
  background: var(--light-surface-container);
  margin-top: 8px;
  @media (max-width: 900px) {
    padding: 40px 0;
  }
  .section-title {
  }
  .grid-wrapper {
    grid-template-columns: 500px 1fr;
    gap: 56px;
    display: grid;
    align-items: start;
    @media (max-width: 1100px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .title-wrapper {
      @media (min-width: 1100px) {
        position: sticky;
        top: 100px;
      }
    }
    .card-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      @media (max-width: 1250px) {
        grid-template-columns: 1fr;
      }
      @media (max-width: 1100px) {
        grid-template-columns: 1fr 1fr;
      }
      @media (max-width: 650px) {
        grid-template-columns: 1fr;
      }
      .card {
        background: var(--light-surface-container-lowest);
        padding: 16px;
        border-radius: 12px;
        border: 1px solid var(--light-outline-variant);
        ul {
          list-style: disc !important;
          margin-left: 32px;
        }
        ol {
          list-style: decimal !important;
          margin-left: 32px;
        }
      }
    }
  }
`;
