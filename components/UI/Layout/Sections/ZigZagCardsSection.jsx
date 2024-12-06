import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Image from "next/image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function ZigZagCardsSection({ title, subtitle, cards }) {
  if (!cards) return null;

  const cardsJSX = cards.map((card, index) => {
    return (
      <div key={index} className="card">
        <div className="image-wrapper" style={{ paddingBottom: "500px" }}>
          <Image
            src={card.image.url}
            alt={card.image.alt}
            fill
            sizes="(max-width: 1100px) 100vw, 50vw"
          />
        </div>
        <div className="content-wrapper">
          <Typography variant="h6" component="div" className="subtitle">
            {card.content.subtitle}
          </Typography>
          <Typography variant="h4" component="h3" className="title">
            {card.content.title}
          </Typography>

          {/* set html dangerously  */}
          <div
            className="description body1"
            dangerouslySetInnerHTML={{ __html: card.content.description }}
          />
          {card.cta_group.cta && (
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
    <Section id="who-we-serve">
      <Container maxWidth="xl" className="container">
        {/* <CenterAlignHeadings title={title} subtitle={subtitle} /> */}
        <div className="cards-wrapper">{cardsJSX}</div>
      </Container>
    </Section>
  );
}
const Section = styled.section`
  padding: 80px 0;
  @media (max-width: 600px) {
    padding: 40px 0;
  }
  .container {
    .cards-wrapper {
      margin-top: 40px;
      @media (max-width: 1000px) {
        margin-top: 24px;
      }
      .card {
        background: var(--light-surface-container-low);
        display: flex;
        align-items: center;
        flex-direction: row;
        @media (max-width: 1000px) {
          flex-direction: column;
          margin-bottom: 16px;
        }
        &:nth-of-type(even) {
          @media (min-width: 1000px) {
            flex-direction: row-reverse;
          }
        }
        .image-wrapper {
          @media (min-width: 1000px) {
            width: 50%;
          }
          overflow: hidden;
          img {
            transition: transform 0.5s ease-in-out;
            &:hover {
              transform: scale(1.1);
            }
          }
        }
        .content-wrapper {
          padding: 16px;
          @media (min-width: 1000px) {
            width: 50%;
            padding: 32px;
          }
          .subtitle {
            margin: 0 0 8px 0;
          }
          .cta {
            margin-top: 16px;
            display: inline-block;
          }
        }
      }
    }
  }
`;
