"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Image from "next/image";
import MenuItem from "./MenuItem/MenuItem";
export default function RestaurantMenu({ menuData, orderOnlineLink }) {
  console.log(menuData)
  const [value, setValue] = useState(0);

  if (!menuData) return null;
  // Extract unique menu categories for the tabs
  const uniqueCategories = Array.from(
    new Set(menuData.map((item) => item.menu_category.value))
  ).map((categoryValue) => {
    const category = menuData.find(
      (item) => item.menu_category.value === categoryValue
    )?.menu_category;
    return category;
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Filter menu items based on selected category
  const filteredMenuData =
    value === 0
      ? menuData // Show all items if "All" tab is selected
      : menuData.filter(
          (item) => item.menu_category.value === uniqueCategories[value].value
        );

  return (
    <Section>
      <Container maxWidth="xl" className="container">
        {/* Tabs for filtering */}
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
          {uniqueCategories.map((category, index) => (
            <Tab key={index} label={category.label} />
          ))}
        </Tabs>

        {/* Filtered Menu Section */}
        <div className="menu-section mt-40">
          {filteredMenuData.map((menuSection, index) => (
            <div key={index} className="menu-category-wrapper">
              <div className="menu-wrapper">
                <Typography variant="h3" className="menu-category-title">
                  {menuSection.menu_category.label}
                </Typography>

                <ul className="menu-items mt-24">
                  {menuSection.menu_item.map((item, itemIndex) => {
                                        console.log(item)
                                        return  (
                                          <MenuItem
                                            key={itemIndex}
                                            dishName={item.dish_name}
                                            dishDescription={item.dish_description}
                                            dishPrice={item.dish_price}
                                            dietaryInformation={item.dietry_information}
                                          />
                                        )
                  })}
                </ul>
              </div>

              {/* Menu Image */}
              {menuSection.menu_image && (
                <div
                  className="image-wrapper"
                  style={{
                    paddingBottom: `${
                      (menuSection.menu_image.height /
                        menuSection.menu_image.width) *
                      100
                    }%`,
                  }}
                >
                  <Image
                    src={menuSection.menu_image.sizes.medium_large}
                    alt={menuSection.menu_image.alt}
                    fill
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: var(--dark-surface-container-lowest);
  padding: 16px 0;
  .tabs-wrapper {
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
  .container {
    .menu-section {
      .menu-category-wrapper {
        margin-bottom: 40px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: start;
        gap: 56px;
        @media (max-width: 1000px) {
          grid-template-columns: 1fr;
        }
        .menu-wrapper {
          .menu-items {
            display: flex;
            flex-direction: column;
            gap: 32px;
          }
        }
        .image-wrapper {
          @media (min-width: 1000px) {
            position: sticky;
            top: 100px;
          }
        }
      }
    }
  }
`;
