import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
function AnchorButton({ href, children }) {
  return (
    <LinkStyle href={href} size="small">
      {children}
    </LinkStyle>
  );
}

export default AnchorButton;
const LinkStyle = styled(Link)`
  background: var(--dark-primary, #e7c446);
  border-radius: 100px;
  padding: 10px 24px;
  color: var(--dark-on-primary, #3c2f00);

  &:hover {
    background: var(--material-theme-ref-primary-primary-70, #c9a82c);
  }
`;
