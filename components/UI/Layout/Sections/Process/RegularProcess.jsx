import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { theme } from "@/utils/themeSettings";
import { ThemeProvider } from "@mui/material/styles";
export default function RegularProcess({ title, description, cards }) {
  if (!cards) return null;

  const stepCards = cards.map((item, index) => {
    return (
      <div className="step-wrapper" key={index}>
        <div className="title">
          <div className="step-title-number-wrapper">
            <div className="step-number">{index + 1}</div>
            <Typography
              variant="h6"
              component="h3"
              color="var(--dark-primary-container)"
            >
              {item.title}
            </Typography>
          </div>

          <div className="border"></div>
        </div>
        <div className="content">
          <Typography
            variant="body1"
            component="div"
            className="description body1"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></Typography>
        </div>
      </div>
    );
  });
  return (
    <ThemeProvider theme={theme}>
      <Section>
        <Container maxWidth="lg" className="container">
          <div className="title-wrapper">
            <Typography variant="h2" component="h2" className="title">
              {title}
            </Typography>
            <div
              className="description body1"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          <div className="steps-wrapper">{stepCards}</div>
        </Container>
      </Section>
    </ThemeProvider>
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
      gap: 0;
    }
    .description {
      font-size: 1.4rem !important;
      p,
      strong {
        font-size: 1.4rem !important;
        color: var(--dark-on-surface-variant);
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
        margin: 24px 0;
      }
      align-items: end;
      .title {
        .step-title-number-wrapper {
          display: grid;
          grid-template-columns: 40px auto;
          align-items: center;
          gap: 16px;

          .step-number {
            background: var(--dark-primary-container);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 700;
            justify-content: center;
            align-items: center;
            border: 2px solid var(--dark-primary-container);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            color: var(--dark-on-primary-container) !important;
          }
        }
      }
      .border {
        margin-top: 24px;
        border-top: 2px solid var(--dark-primary-container);
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
  }
`;
