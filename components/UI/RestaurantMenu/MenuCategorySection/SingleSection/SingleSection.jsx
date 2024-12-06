import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import MenuItem from "../../MenuItem/MenuItem";
// import MenuItemImage from "@/components/UI/Menu/MenuItem/MenuItemWithImage";

function SingleSection({ singleSectionData }) {
  console.log(singleSectionData);
  // split the array to get the first item with an image
  let singleImageItem = null;
  let imageItemSet = false;

  const remainingItems = singleSectionData.menu_content.filter((dish) => {
    if (dish.dish_image && !imageItemSet) {
      singleImageItem = dish;
      imageItemSet = true;
      return false;
    }
    return true;
  });

  // get the category name from the value
  const str = singleSectionData.acf_fc_layout;
  // Replace underscores with spaces
  const stringWithSpaces = str.replace(/_/g, " ");
  // Capitalize each word
  const sectionTitle = stringWithSpaces.replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );

  const menuCards = remainingItems.map((item, index) => {
    return (
      <MenuItem
        key={index}
        dishName={item.dish_name}
        dishDescription={item.dish_description}
        dishPrice={item.dish_price}
        condition={item.condition}
        dietaryInformation={item.dietary_information}
      />
    );
  });
  return (
    <Container id={singleSectionData.acf_fc_layout} className="pt-16 ">
      <div className="title-wrapper">
        <h3 className="section-title font-serif mb-4">{sectionTitle}</h3>
        <Divider sx={{ borderColor: "#7D7767", marginTop: "8px" }} />
      </div>
      <div className="cards-wrapper mt-8 ">
        {singleImageItem ? (
          <>
            <ul className="card-with-image">
              {/* <MenuItemImage
                dishName={singleImageItem.dish_name}
                dishDescription={singleImageItem.dish_description}
                dishPrice={singleImageItem.dish_price}
                dishImage={singleImageItem.dish_image}
                dietaryInformation={singleImageItem.dietary_information}
              /> */}
            </ul>
            <ul className="cards flex">{menuCards}</ul>
          </>
        ) : (
          <ul className="full-width-cards flex">{menuCards}</ul>
        )}
      </div>
    </Container>
  );
}

export default SingleSection;

const Container = styled.div`
  .title-wrapper {
    .section-title {
      color: var(--light-on-surface-variant, #4c4639);
      font-size: var(--material-theme--display--large);
      font-weight: 400;
      letter-spacing: 3px;
      line-height: 2.3rem;
      @media (max-width: 640px) {
        font-size: var(--material-theme--headline--large);
      }
    }
  }
  .cards-wrapper {
    flex-wrap: wrap;
    flex-direction: row;
    display: flex;
    gap: 32px;

    .card-with-image {
      width: calc(33% - 16px);
      @media (max-width: 1260px) {
        width: calc(40% - 16px);
      }
      @media (max-width: 640px) {
        width: 100%;
      }
    }
    .cards {
      width: calc(67% - 16px);
      flex-wrap: wrap;
      gap: 32px;
      @media (max-width: 1260px) {
        width: calc(60% - 16px);
      }
      @media (max-width: 640px) {
        width: 100%;
      }
    }
    .full-width-cards {
      width: 100%;
      flex-wrap: wrap;
      gap: 32px;

      li {
        width: calc(32% - 16px);
        @media (max-width: 1260px) {
          width: calc(50% - 16px);
        }
        @media (max-width: 640px) {
          width: 100%;
        }
      }
    }
  }
`;
