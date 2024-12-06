import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import PatternHeading from "../../Headings/PatternHeading";

import Package from "../../Card/Package";
import dynamic from "next/dynamic";
const Madala = dynamic(() => import("../../Patterns/Madala"));

export default function CateringPackageSection({ title, description, cards }) {
  return (
    <Section className="mt-8">
      <Madala className="pattern" />
      <Container maxWidth="xl" className="container">
        <PatternHeading
          title={title}
          description={description}
          centerAlign={true}
        />
        <div className="tabs mt-24">
          {/* Tabs for filtering */}

          {/* Filtered combo deals grid */}
          <div className="cards grid-wrapper">
            {cards.map((item, index) => (
              <Package
                key={index}
                packageName={item.combo_name}
                packagePrice={item.price}
                packageItems={item.included}
                termsAndConditions={item.terms_and_conditions}
                isItPopular={item.is_this_combo_popular}
                cta={item.cta}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  position: relative;

  overflow: hidden;

  .pattern {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    right: -50%;
    @media (max-width: 600px) {
      display: none;
    }
    /* add rotation animation */
    animation: rotate 100s linear infinite;
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  .container {
    padding-top: 80px;
    padding-bottom: 80px;
    @media (max-width: 900px) {
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }
  .title-row {
    max-width: 1000px;
    margin: 0 auto;
    .title {
    }
    .subtitle {
    }
    .description {
      margin-top: 16px;
    }
  }
  /* tabs buttons */
  .tabs-wrapper {
    max-width: 1000px;
    margin: 0 auto;
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
  .cards {
    margin-top: 56px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;
    align-items: start;
    @media (max-width: 1000px) {
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    @media (max-width: 650px) {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }
`;
