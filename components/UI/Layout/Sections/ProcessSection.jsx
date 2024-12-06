import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RegularProcess from "./Process/RegularProcess";
import StickyProcess from "./Process/StickyProcess";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ProcessSection({ title, description, cards }) {
  const matches = useMediaQuery("(min-width:1000px)");

  if (!cards) return null;

  return (
    <>
      {matches ? (
        <StickyProcess title={title} description={description} cards={cards} />
      ) : (
        <RegularProcess title={title} description={description} cards={cards} />
      )}
    </>
  );
}
const Section = styled.section`
  padding: 40px 0;
  overflow: hidden !important;
  .title-wrapper {
    display: grid;
    grid-template-columns: auto 600px;
    gap: 40px;
    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
    }
    .description {
      font-size: 1.4rem !important;
      p {
        font-size: 1.4rem !important;
      }
      @media (max-width: 900px) {
        font-size: 1.2rem !important;
        p {
          font-size: 1.2rem !important;
        }
      }
    }
  }
  .steps-wrapper {
    .step-wrapper {
      margin: 80px 0;
      display: grid;
      gap: 40px;
      grid-template-columns: auto 600px;
      @media (max-width: 1000px) {
        grid-template-columns: 1fr;
        gap: 16px;
        margin: 56px 0;
      }
      align-items: end;
      .title {
        .step-title-number-wrapper {
          display: grid;
          grid-template-columns: 70px auto;
          align-items: center;
          gap: 24px;
          @media (max-width: 500px) {
            grid-template-columns: 50px auto;
            gap: 16px;
          }
          .step-number {
            background: var(--white);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            font-weight: 700;
            justify-content: center;
            align-items: center;
            color: var(--white);
            border: 2px solid var(--white);
            width: 70px;
            height: 70px;
            border-radius: 50%;
            color: var(--gray-dark) !important;
            @media (max-width: 500px) {
              width: 50px;
              height: 50px;
              font-size: 1.8rem;
            }
          }
        }
      }
      .border {
        margin-top: 24px;
        border-top: 1px solid var(--white);
        height: 1px;
        @media (max-width: 600px) {
          margin-top: 16px;
        }
      }
    }
    .content {
      color: var(--white);
    }
    h2 {
    }
    p {
      color: var(--white);
      letter-spacing: 0.1rem;
      font-size: 1rem;
      font-weight: 200 !important;
      line-height: 1.5rem;
    }
  }
`;
