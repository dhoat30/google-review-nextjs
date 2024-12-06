import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
function AnchorOutlinedButtonDark({ href, children, align }) {
  return (
    <LinkStyle align={align} href={href}>
      {children}
    </LinkStyle>
  );
}

export default AnchorOutlinedButtonDark;
const LinkStyle = styled(Link)`
  border: 1px solid var(--light-outline, #7d7767);
  border-radius: 100px;
  padding: 10px 24px;
  color: var(--light-primary, #725c00);
  margin: ${(props) => (props.align === "right" ? "0 0 0 auto" : "0")};

  &:hover {
    background: var(--dark-primary, #e7c446);
    color: var(--dark-on-primary, #3c2f00);
  }
`;
