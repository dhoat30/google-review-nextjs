import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import useActiveSection from "@/hooks/useActiveSection";
function SubNav({ dataArr }) {
  //section id array for useActiveSection hook
  const sectionIDArr = dataArr.map((item) => {
    return item.acf_fc_layout;
  });
  //get active section
  const activeSection = useActiveSection(sectionIDArr);
  useEffect(() => {
    handleChange(null, sectionIDArr.indexOf(activeSection));
  }, [activeSection]);

  const [showSubnav, setShowSubnav] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowSubnav(true);
      } else {
        setShowSubnav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tab = dataArr.map((item, index) => {
    return (
      <Tab
        key={index}
        label={item.acf_fc_layout.replace(/_/g, " ")}
        component="a"
        href={`#${item.acf_fc_layout}`}
      />
    );
  });

  return (
    <>
      {showSubnav && (
        <Section elevation={5}>
          <Container className="wrapper" maxWidth="xl" component="div">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
              textColor="secondary"
              indicatorColor="secondary"
              className="tabs-wrapper"
            >
              {tab}
            </Tabs>
            <Link
              className="cta-link"
              href="/book-consultation"
              target="_blank"
            >
              <Button size="sm" variant="contained" color="secondary">
                BOOK FREE CONSULTATION
              </Button>
            </Link>
          </Container>
        </Section>
      )}
    </>
  );
}

export default SubNav;
const Section = styled(Paper)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--dark-surface, #131316);
  z-index: 1101;

  @media (max-width: 720px) {
    .cta-link {
      display: none;
    }
  }

  .wrapper {
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1150px) {
      .tabs-wrapper {
        width: 60%;
      }
    }
    @media (max-width: 720px) {
      padding-left: 0 !important;
      padding-right: 0 !important;
      .tabs-wrapper {
        width: 100%;
      }
    }

    .cta-link {
      width: 222px;
    }
  }
  .MuiButtonBase-root {
    /* color: var(--material-theme-ref-neutral-neutral-99, #fdfcf5); */
  }
  .Mui-selected {
    /* color: var(--dark-secondary, #f8f770); */
  }
  button {
    /* color: white; */
  }
`;
