import React from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
export default function ServiceCard({ title, description, image, cta }) {
  return (
    <Card className="tab-content-wrapper card">
      <div
        className="image-wrapper"
        style={{
          paddingBottom: `56.25%`,
        }}
      >
        <Image src={image?.sizes?.medium_large} alt={image?.alt} fill />
      </div>

      <div className="content-wrapper">
        <Typography variant="h6" component="h3" className="title">
          {title}
        </Typography>
        <Typography
          color="var(--dark-on-surface)"
          variant="body1"
          component="div"
          className="description body1 mt-8"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="cta-wrapper flex gap-8 flex-wrap mt-24">
          <Link href={cta?.link} className="cta">
            <Button
              size="large"
              variant="outlined"
              color="primary"
              disableElevation
            >
              {cta?.label}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

const Card = styled.div`
  .card {
    border-radius: 8px;
    overflow: hidden;
    background: var(--light-surface-container);
    border: 1px solid var(--light-outline-variant);
    .content-wrapper {
      padding: 16px;
    }
  }
`;
