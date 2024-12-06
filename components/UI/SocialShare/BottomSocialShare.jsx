"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Twitter from "../Icons/Twitter";
import FacebookCircleIcon from "../Icons/FacebookCircleIcon";
import Linkedin from "../Icons/Linkedin";
import Messenger from "../Icons/Messenger";
import Whatsapp from "../Icons/Whatsapp";
import EmailIcon from "../Icons/EmailIcon";
export default function BottomSocialShare({
  className,
  title,
  url,
  description,
}) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedDescription = encodeURIComponent(description);
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`;
  const messengerUrl = `fb-messenger://share?link=${encodedUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodedTitle} ${encodedUrl}`;
  const mailUrl = `mailto:?subject=${encodedTitle}&body=Check out this link: ${encodedUrl} - ${encodedDescription}`;

  return (
    <Container className={className}>
      <Typography
        variant="h5"
        component="div"
        color="var(--white)"
        className="title"
      >
        Don&apos;t forget to share this post!
      </Typography>
      <div className="share-wrapper">
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <Twitter />
        </a>
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <FacebookCircleIcon />
        </a>
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
          <Linkedin />
        </a>
        <a href={messengerUrl} target="_blank" rel="noopener noreferrer">
          <Messenger />
        </a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Whatsapp />
        </a>
        <a
          className="email"
          href={mailUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <EmailIcon />
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 32px;
  .title {
    font-weight: 600;
  }
  .share-wrapper {
    margin-top: 16px;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    a {
      svg {
        width: 40px;
        height: 40px;
      }
      .email {
        svg {
          path {
          }
        }
      }
    }
  }
`;
