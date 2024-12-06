import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
function AnchorLightButton({ href, children }) {
  return <LinkStyle href={href}>{children}</LinkStyle>;
}

export default AnchorLightButton;
const LinkStyle = styled(Link)`
  background: var(
    --material-theme-surfaces-light-surface-1,
    linear-gradient(
      0deg,
      rgba(114, 92, 0, 0.05) 0%,
      rgba(114, 92, 0, 0.05) 100%
    ),
    #fef9ef
  );

  border-radius: 100px;
  padding: 10px 24px;
  color: var(--light-primary, #725c00);
  &:hover {
    background: var(
      --material-theme-surfaces-light-surface-5,
      linear-gradient(
        0deg,
        rgba(114, 92, 0, 0.14) 0%,
        rgba(114, 92, 0, 0.14) 100%
      ),
      #fef9ef
    );
  }
`;
