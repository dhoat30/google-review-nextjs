import React, { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import GoogleIcon from "../Icons/GoogleIcon";

export default function TestimonialCard({ name, description, customerPic }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const numberOfStars = 5;
  const starsJSX = Array.from({ length: numberOfStars }, (_, index) => (
    <StarIcon key={index} sx={{ color: "#FABB05", fontSize: "1rem" }} />
  ));

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Limit description to 25 words if not expanded
  const wordLimit = 40;
  const words = description.split(" ");
  const shortDescription =
    words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;

  return (
    <Div>
      <div className="profile-wrapper">
        <Image
          src={customerPic.url}
          alt={`${name} profile picture`}
          width="40"
          height="40"
        />
        <div className="name-wrapper">
          <Typography variant="subtitle1" component="h3">
            {name}
          </Typography>
          {starsJSX}
        </div>
      </div>
      <div className="description-wrapper mt-16 mb-16">
        <Typography variant="body1" component="p">
          {isExpanded ? description : shortDescription}
        </Typography>
        {words.length > wordLimit && (
          <button onClick={toggleExpand} className="read-more-button">
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
      <GoogleIcon />
    </Div>
  );
}

const Div = styled.div`
  background: var(--dark-surface-container-lowest);
  padding: 16px;
  border: 1px solid var(--dark-outline-variant);
  max-width: calc(100% - 16px);
  .profile-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .description-wrapper {
    position: relative;
    p {
      margin-bottom: 8px;
    }
    .read-more-button {
      background: none;
      border: none;
      color: var(--dark-primary);
      cursor: pointer;
      font-weight: 500;
      text-decoration: underline;
    }
  }
`;
