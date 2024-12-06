"use client";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import React from "react";
import styled from "@emotion/styled";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
export default function CategoryTopFilter({ data, className }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //   set a default value to "all" if the search param is empty
  const [value, setValue] = React.useState(
    searchParams.get("category") ? searchParams.get("category") : "all"
  );

  //   set a new value to tabs and push a category param to the url
  const handleChange = (event, newValue) => {
    setValue(newValue);
    router.push(`${pathname}?category=${newValue}`);
  };

  //   loop around the category array and create a tab for each category
  const tabs = data.map((item, index) => {
    return <Tab label={item.name} key={index} value={item.slug} />;
  });

  return (
    <BoxSection className={className}>
      <Container className="row filters-container" maxWidth="xl">
        {/* <Box className="filter-label-wrapper">
          <Typography
            component="div"
            variant="h6"
            color=" var(--dark-on-surface)"
            className="filter-label"
          >
            <Filters />
            <span>Filters</span>
          </Typography>
        </Box> */}
        <Box className="filter-tab-wrapper">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            textColor="secondary"
            indicatorColor="secondary"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="All" value="all" />
            {tabs}
          </Tabs>
        </Box>
      </Container>
    </BoxSection>
  );
}
const BoxSection = styled(Box)`
  padding: 40px 0 0 0;
  border-bottom: 1px solid rgba(53, 52, 56, 1);

  .filters-container {
    .filter-label-wrapper {
      .filter-label {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    .filter-tab-wrapper {
    }
  }
`;
