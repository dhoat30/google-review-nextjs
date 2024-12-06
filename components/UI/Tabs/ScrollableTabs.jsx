import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

function CustomTabPanel(props) {
  const {
    children,
    value,
    index,
    description,
    title,
    images,
    ctaArray,
    ...other
  } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="tab-content-wrapper">
          <div className="image-container"></div>
          <div className="content-wrapper"></div>
        </div>
      )}
    </div>
  );
}
export default function ScrollableTabs({ tabsData }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = tabsData.map((item, index) => {
    return <Tab key={index} label={item.title} />;
  });
  return (
    <Container>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs"
        textColor="secondary"
        indicatorColor="secondary"
        className="tabs-wrapper"
      >
        {tabs}
      </Tabs>
      {/* content panels  */}
      {tabsData.map((item, index) => {
        return (
          <CustomTabPanel
            key={100 + index}
            value={value}
            index={index}
            className="description-wrapper"
            description={item.description}
            title={item.title}
            ctaArray={item.buttons}
            images={item.images}
          ></CustomTabPanel>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
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
  .tab-content-wrapper {
    padding-top: 40px;
    display: grid;
    grid-template-columns: 1fr 450px;
    gap: 40px;
    align-items: start;
    @media (max-width: 1100px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .content-wrapper {
      @media (min-width: 1100px) {
        position: sticky;
        top: 100px;
      }

      .title {
      }
      .description {
        color: var(--dark-on-surface-variant);
      }
    }
  }
  .description {
    strong {
      color: var(--dark-secondary, #f8f770);
      letter-spacing: 0.1rem;
    }
  }
  .image-container {
    overflow: hidden;
    border-radius: 8px;
  }
`;
