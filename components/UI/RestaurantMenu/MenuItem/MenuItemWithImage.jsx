import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import GlutenFreeIcon from "../../Icons/GlutenFreeIcon";
import VeganIcon from "../../Icons/VeganIcon";
import VegetarianIcon from "../../Icons/VegetarianIcon";
import DairyFreeIcon from "../../Icons/DariyFreeIcon";

function MenuItemImage({
  dishName,
  dishDescription,
  dishPrice,
  dishImage,
  dietaryInformation,
}) {
  const [glutenFree, setGlutenFree] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);
  useEffect(() => {
    const dietaryInfo = dietaryInformation.map((item, index) => {
      if (item === "vegetarian: Vegetarian") {
        setVegetarian(true);
      } else if (item === "vegan: Vegan") {
        setVegan(true);
      } else if (item === "glutenFree: Gluten Free") {
        setGlutenFree(true);
      } else if (item === "dairyFree: Dairy Free") {
        setDairyFree(true);
      }
    });
  }, []);

  return (
    <Container className="image-item">
      <div className="dish-image-wrapper">
        <Image
          src={dishImage.url}
          alt={dishImage.alt ? dishImage.alt : dishName}
          fill
          quality={70}
        />
      </div>
      <div className="content-wrapper">
        <div className="dish-name-price-wrapper flex gap-x-4">
          <div className="dish-name-wrapper flex-initial">
            <h4 className="dish-name">
              {dishName.toLowerCase()}
              {glutenFree && <GlutenFreeIcon className="inline-block" />}
              {vegan && <VeganIcon className="inline-block" />}
              {vegetarian && <VegetarianIcon className="inline-block" />}
              {dairyFree && <DairyFreeIcon className="inline-block" />}
            </h4>
          </div>
          <div className="dish-border  flex-1"></div>
          <h6 className="flex-initial dish-price">{dishPrice} </h6>
        </div>
        <p className="dish-description mt-4">{dishDescription} </p>
      </div>
    </Container>
  );
}

export default MenuItemImage;
const Container = styled.li`
  width: 100%;
  height: 100%;
  .dish-image-wrapper {
    position: relative;
    width: 90%;
    height: 250px;
    left: 10%;
    img {
      object-fit: cover;
    }
  }
  .dish-name-price-wrapper {
    svg {
      margin-left: 4px;
      width: 16px;
      height: 16px;
      path {
        fill: var(--light-on-surface-variant, #4c4639);
      }
    }
    .dish-name-wrapper {
      .dish-name {
        color: var(--light-on-surface, #1d1b16);
        font-weight: 500;
        font-size: var(--material-theme--body--large);
        line-height: 1rem;
        text-transform: capitalize;
      }
    }
    .dish-price {
      color: var(--light-on-surface, #1d1b16);
      font-weight: 400;
      font-size: var(--material-theme--body--large);
      line-height: 1rem;
    }
    .dish-border {
      border-bottom: 1px solid #cec6b4;
    }
  }
  .dish-description {
    font-size: var(--material-theme--label--large);
    font-weight: 400;
    color: var(--light-on-surface-variant, #4c4639);
  }
  .content-wrapper {
    background: var(--material-theme-white, #fff);
    padding: 16px 16px;
    width: 90%;
    position: relative;
    top: -50px;
  }
`;
