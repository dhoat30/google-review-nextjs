import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import React from "react";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
interface BusinessSmallCardProps {
  businessName: string;
  businessMapUrl: string;
  logoUrl: string;
  businessId: number;
  totalReviews: number;
  totalScore: number;
}
export default function BusinessSmallCard({
  businessName,
  businessMapUrl,
  logoUrl,
  businessId,
  totalReviews, 
  totalScore
}: BusinessSmallCardProps) {
  const numberOfStars = 5;
  const starsJSX = Array.from({ length: numberOfStars }, (_, index) => (
    <StarIcon key={index} sx={{ color: "#FABB05", fontSize: "1.3rem" }} />
  ));

  return (
    <PaperStyled variant="outlined">
      <div className="title-wrapper grid gap-16">
        <div className="image-wrapper">
          <Image src={logoUrl} alt={businessName} fill />
        </div>
        <Typography variant="h6" component={"h2"}>
          {businessName}
        </Typography>
      </div>
      <div className="review-wrapper mt-8">
        <Typography variant="subtitle1" component={"p"}>
          Your Google reviews
        </Typography>
        <div className="stars-wrapper mt-8 flex gap-8">
          <div className="stars">{starsJSX}</div>

          <Typography variant="h6" component={"p"} className="">
         {totalScore}
          </Typography>
        </div>
        <Typography variant="body1" component={"p"}>
            {totalReviews} reviews
        </Typography>
      </div>
    </PaperStyled>
  );
}

const PaperStyled = styled(Paper)`
  background: var(--light-surface-container);
  padding: 16px;
  border-radius: 16px;
  .title-wrapper {
    grid-template-columns: 50px 1fr;
    .image-wrapper {
      width: 50px !important;
      height: 50px !important;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid var(--light-outline-variant);
      img {
        object-fit: fill;
      }
    }
  }
`;
