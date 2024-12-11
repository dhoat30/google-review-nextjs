"use client";
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import {headerLinks} from "../../../../utils/headerLinks";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";
import {signIn, signOut, useSession} from "next-auth/react"

function DesktopNavbar() {
  const menuRef = useRef(null);

  const {data: session} = useSession(); 



  // router
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };



  // render menu items
  const menuItems = headerLinks.map((item, index) => {
    return (
      <Box
        className="link"
        component="li"
        key={index}
        sx={{ color: "white", display: "block", position: "relative" }}
   
      >
        <Link href={item.url} className={isActive(item.url) ? "active" : ""}>
          <Typography component="span" variant="body1" align="center">
            {item.label}
          </Typography>
        
        </Link>

       
      </Box>
    );
  });
  return (
    <>
      <AppBarContainer
  className="navbar-wrapper"      
      >
        <div className="max-width-xl">
          <div className="grid-links-wrapper">
            {/* logo  */}
            <Link href="/">
              <Image
                src="/logo.png"
                width={50}
                height={50}
                alt={`${process.env.name} Logo`}
                style={{ cursor: "pointer" }}
              />
            </Link>
            {/* menu */}
            <div className="links-wrapper">
              <Box
                component="ul"
              >
                {menuItems}
                <Box
        className="link"
        component="li"
  
        sx={{ color: "white", display: "block", position: "relative" }}
   
      >
          <Link href="/dashboard"   onClick={(e)=>  { 
            e.preventDefault() 
            signOut()
          } }>
          <Typography component="span" variant="body1" align="center">
           Sign out
          </Typography>
          </Link>
      
        </Box>
              </Box>

            </div>
          </div>
        </div>
      </AppBarContainer>
    </>
  );
}
export default DesktopNavbar;

const AppBarContainer = styled.section`

padding-top: 56px; 
  .grid-links-wrapper {
    .links-wrapper {
   ul{ 
    margin-top: 56px; 
   }
  }
  }

  .link {
    a {
      &:hover {
        color: var(--dark-primary);
        svg {
          color: var(--dark-primary);
        }
      }
      span {
        &:hover {
          color: var(--dark-primary);
          svg {
            color: var(--dark-primary);
          }
        }
      }
    }
    > a {
      display: flex;
      align-items: center;
      color: var(--dark-on-surface);
      padding: 16px 16px;
      border-radius: 8px; 
      @media (max-width: 1366px) {
        padding: 16px 16px;
      }
      @media (max-width: 1366px) {
        padding: 16px 8px;
      }
      &.active {
        background: var(--light-surface-container-lowest);
     
      }
    }
  }
  .sublinks-container {
    padding: 8px 0;
    width: 250px;
    .subLink {
      display: block;
      padding: 8px 16px;
      font-weight: 350;
    }
  }
`;
