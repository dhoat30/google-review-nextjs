import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
export default function OrderSummary({
  serviceName,
  packageName,
  price,
  description,
}) {
  return (
    <Container>
      <Typography variant="h5" component="h2">
        Order Summary
      </Typography>
      <div className="summary-wrapper">
        <Paper className="card" variant="outlined">
          <div className="content-wrapper">
            <Typography className="title" component="h3" variant="h5">
              {packageName}
            </Typography>
            <Typography
              className="service-title"
              component="div"
              variant="subtitle1"
            >
              {serviceName}
            </Typography>
            <Typography
              className="description mt-8"
              component="p"
              variant="body1"
            >
              {description}
            </Typography>
            <Typography className="price mt-16" component="div" variant="h5">
              ${price}+GST
            </Typography>
          </div>
        </Paper>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .summary-wrapper {
    .card {
      padding: 16px;
      margin-top: 16px;
      .link {
        display: grid;
        grid-template-columns: 5fr 7fr;
        gap: 16px;
        align-items: center;

        .image-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
        }
      }
    }
    .total-wrapper {
      margin-top: 16px;
      padding-top: 8px;
      border-top: 1px solid var(--light-outline-variant);
    }
  }
`;
