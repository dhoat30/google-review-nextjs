import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
function Button({ onClick, children, align }) {
  return (
    <Container onClick={onClick} align={align}>
      {children}
    </Container>
  );
}

export default Button;
const Container = styled.button`
  background: var(--dark-primary, #e7c446) !important;
  border-radius: 100px;
  color: var(--dark-on-primary, #3c2f00);
  margin: ${(props) => (props.align === "right" ? "0 0 0 auto" : "0")};
  display: block;
  padding: 10px 24px;
  .MuiLoadingButton-loadingIndicator {
    top: 15px;
  }
  span {
    color: var(--dark-on-primary, #3c2f00);
  }
  svg {
    path {
      fill: var(--dark-on-primary, #3c2f00);
    }
  }
  &:hover {
    background: var(
      --material-theme-ref-primary-primary-70,
      #c9a82c
    ) !important;
  }
`;
