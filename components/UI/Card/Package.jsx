import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Package({
  packageName,
  packagePrice,
  packageDescription,
  packageItems,
  termsAndConditions,
  cta,
  isItPopular,
  highlightLabel,
  
}) {
  return (
    <Div className={`package ${isItPopular && "highlighted-package"}`}>
      {isItPopular && (
        <Typography
          variant="subtitle1"
          component="div"
          className="highlighted-tag"
        >
          {highlightLabel ? highlightLabel : "Popular"}
        </Typography>
      )}
      <Typography
        variant="subtitle1"
        component="h3"
        className="package-title"
        color="white"
      >
        {packageName}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        className="description mt-16"
        color="var(--dark-on-surface-variant)"
      >
        {packageDescription}
      </Typography>
      <div className="price-wrapper mt-16 mb-16">
        <Typography
          component="span"
          variant="subtitle1"
          className="price"
          color="white"
        >
          ${packagePrice}
        </Typography>
        {termsAndConditions && (
          <Typography
            color="white"
            component="span"
            variant="body2"
            className="terms-and-conditions"
          >
            *{termsAndConditions}
          </Typography>
        )}
      </div>
      <ul className="included-services-wrapper mt-24">
        {packageItems?.map((item, index) => {
          return (
            <li key={index} className="flex align-center gap-4 mt-8">
              <CheckCircleIcon sx={{ color: "white" }} />
              <Typography variant="subtitle1" component="span" color="white">
                {item.item}
              </Typography>
            </li>
          );
        })}
      </ul>
      {cta && 
      <Link href={cta.url} target={cta.target} className="cta-wrapper mt-24">
 <Button variant="contained" disableElevation >
          {cta.title}
        </Button>
      </Link>
      }
    </Div>
  );
}
const Div = styled.div`
  border: 1px solid
    var(--material-theme-sys-dark-surface-container-highest, #03327a);
  border-radius: 12px;
  padding: 24px 16px;
  background: var(--dark-surface-container-lowest);
  .package-title {
    font-size: 1.5rem;
    font-weight: 500;
  }
  .price-wrapper {
    display: flex;
    gap: 8px;
    align-items: flex-end;
    .price {
      font-weight: 400;
      font-size: 2.5rem;
      line-height: 2.2rem;
    }
  }
  .cta-wrapper {
    width: 100%;
    display: block;
    button {
      width: 100%;
      background: white;
      color: var(--dark-on-primary);
    }
  }

  &.highlighted-package {
    position: relative;
    border: 1px solid #46acdb;
    background: linear-gradient(
      180deg,
      rgba(70, 172, 219, 0.3) 0%,
      rgba(134, 65, 213, 0.3) 100%
    );

    .highlighted-tag {
      position: absolute;
      top: -19px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 6px;
      border: 1px solid #46acdb;
      background: linear-gradient(98deg, #46acdb 6.38%, #8641d5 93.34%);
      color: white;
      padding: 4px 16px;
    }
    .cta-wrapper {
      button {
        color: white;
        border: 1px solid #46acdb;

        background: linear-gradient(91deg, #46acdb 2.5%, #8641d5 49.68%);
      }
    }
  }
`;
