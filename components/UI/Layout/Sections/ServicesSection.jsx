import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Image from "next/image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import OutlinedDarkButton from "../../Buttons/OutlinedDarkButton";

export default function ServicesSection({
  title,
  subtitle,
  description,
  cards,
  sectionCtaGroup,
}) {
  if (!cards) return null;

  const cardsJSX = cards.map((card, index) => {
    return (
      <div key={index} className="card">
        <div className="content-wrapper">
          {card?.subtitle && (
            <Typography variant="h6" component="div" className="subtitle">
              {card?.subtitle}
            </Typography>
          )}

          <Typography variant="h4" component="h3" className="title">
            {card?.title}
          </Typography>

          {/* set html dangerously  */}
          <div
            className="description body1"
            dangerouslySetInnerHTML={{ __html: card?.description }}
          />
          {card?.cta_group?.cta && (
            <Link href={card.cta_group.cta.url} className="cta">
              <Button variant={card.cta_group.cta_type} color="primary">
                {card.cta_group.cta.title}
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  });
  return (
    <Section id="our-services">
      <Container maxWidth="xl" className="container">
        <div className="title-wrapper">
          <Typography variant="h5" component="div" className="subtile">
            {subtitle}
          </Typography>
          <Typography variant="h2" component="h2" className="title">
            {title}
          </Typography>
          {/* set html dangerously  */}
          <div
            className="description body1"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        {/* cards */}
        <div className="cards-wrapper">
          {sectionCtaGroup?.cta && (
            <div className="section-cta">
              <Link href={sectionCtaGroup.cta.url}>
                <Button variant="contained">{sectionCtaGroup.cta.title}</Button>
              </Link>
            </div>
          )}
          {cardsJSX}
        </div>
      </Container>
    </Section>
  );
}
const Section = styled.section`
  padding: 80px 0 80px 0;
  background: var(--dark-surface-container-lowest);
  @media (max-width: 600px) {
    padding: 40px 0 40px 0;
  }
  .title-wrapper {
    padding-top: 40px;
    padding-bottom: 80px;
    @media (max-width: 900px) {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  .cards-wrapper {
    margin-top: 40px;
    /* display: grid;
    grid-template-columns: 300px 1fr 1fr 1fr; */
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    align-items: start;

    @media (max-width: 900px) {
      margin-top: 24px;
      flex-direction: column-reverse;
    }
    > div {
      width: calc(25% - 40px);
      @media (max-width: 1200px) {
        width: calc(33% - 40px);
      }
      @media (max-width: 900px) {
        width: 100%;
      }
    }
    .section-cta {
      button {
        width: 100%;
        background: var(--dark-primary);
        color: var(--dark-on-primary);
        padding-top: 12px;
        padding-bottom: 12px;
        border-radius: 50px;
        font-size: 1.1rem;
      }
    }
    .card {
      .container {
      }

      .image-wrapper {
      }
      .content-wrapper {
        .subtitle {
          margin: 0 0 8px 0;
        }
        .title {
          font-weight: 600;
          margin-bottom: 24px;
        }
        .cta {
          margin-top: 16px;
          display: inline-block;
        }
      }
    }
  }
`;
