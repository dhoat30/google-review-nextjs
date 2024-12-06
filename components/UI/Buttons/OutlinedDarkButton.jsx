import styled from "@emotion/styled";
import React from "react";
import Button from "@mui/material/Button";

export default function OutlinedDarkButton({ children }) {
  return (
    <ButtonStyled size="large" variant="outlined">
      {children}
    </ButtonStyled>
  );
}
const ButtonStyled = styled(Button)`
  border: 1px solid var(--white);
  color: var(--white);
  -webkit-transition: all 0.8s;
  -o-transition: all 0.8s;
  transition: all 0.8s;
  overflow: hidden;
  z-index: 2;
  padding-left: 32px !important;
  padding-right: 32px !important;

  &::after {
    content: "";
    position: absolute;
    top: -30px;
    left: -30px;
    right: -30px;
    bottom: 130%;
    background: var(--white);
    -webkit-transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    transform: rotate(-5deg);
    -webkit-transition: all 0.8s;
    -o-transition: all 0.8s;
    transition: all 0.8s;
    z-index: -1;
  }
  &:hover::after {
    bottom: -30px;
    transform: rotate(0deg);
    color: var(--black);
  }
  &:hover {
    color: var(--black);
  }
`;
