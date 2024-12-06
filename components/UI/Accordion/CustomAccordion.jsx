import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import style from "@emotion/styled";

// Styled Accordion components
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon />} {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomAccordion({ qaData }) {
  const [expanded, setExpanded] = React.useState(false);

  if (!qaData) return null;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Ensure the correct panel is set
  };

  const faqList = qaData.map((item, index) => {
    const accordionPanel = `panel${index}`; // Ensure unique panel ID for each accordion
    return (
      <Accordion
        key={index}
        expanded={expanded === accordionPanel} // Expanded if the panel is the same as the current state
        onChange={handleChange(accordionPanel)} // Handle panel change
        sx={{
          background: "background: var(--light-surface-container-low)",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}a-content`}
          id={`panel${index}a-header`}
        >
          <Typography>{item.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{item.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  });

  return <Container>{faqList}</Container>;
}

const Container = style.div``;
