import styled from "@emotion/styled";
import React from "react";
import Typography from "@mui/material/Typography";
export default function Stats({ className, label, value }) {
  return (
    <Div className={className}>
      <Typography variant="subtitle1" component="span" className={"value"}>
        {value}
      </Typography>
      <Typography variant="body1" component="span" className={"label"}>
        {label}
      </Typography>
    </Div>
  );
}
const Div = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(237, 198, 112, 0.7);
  max-width: 300px;
  justify-content: space-between;
  .value {
    width: 180px;
    font-size: 4rem;
    color: var(--dark-tertiary-fixed-dim);
    @media (max-width: 350px) {
      width: 120px;
    }
  }
  .label {
    width: 170px;
    @media (max-width: 350px) {
      width: 120px;
    }
  }
`;
