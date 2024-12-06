"use client";
import { useState, useRef, useEffect } from "react";
import { styled as style, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import styled from "@emotion/styled";
import MenuIcon from "../../Icons/MenuIcon";
import Link from "next/link";
import ArrowIcon from "../../Icons/ArrowIcon";
import {headerLinks} from "../../../../utils/headerLinks";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Button from "@mui/material/Button";

import dynamic from "next/dynamic";

const Drawer = dynamic(() => import("@mui/material/Drawer"));

const drawerWidth = 300;

const DrawerHeader = style("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MobileNavbar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(-1); // To track which submenu is open
  const pathname = usePathname();
  const router = useRouter(); // To programmatically navigate

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event, item, index) => {
    event.preventDefault();

    // Check if the link has sublinks
    if (item.subLinks && item.subLinks.length > 0) {
      // If the same submenu is open, navigate to the link
      if (showMenu === index) {
        router.push(item.url); // Navigate to the link
        handleDrawerClose(); // Close the drawer after navigation
      } else {
        // Open the submenu
        setShowMenu(index);
      }
    } else {
      // If no sublinks, just navigate and close the drawer
      router.push(item.url);
      handleDrawerClose();
    }
  };

  const menuItems = headerLinks.map((item, index) => {
    return (
      <li
        className="flex-auto text-center relative parent-list-item"
        key={index}
      >
        <Link
          href={item.url}
          className={`parent-link body1 ${
            pathname === item.url ? "active" : ""
          }`}
          onClick={(event) => handleClick(event, item, index)}
        >
          {item.label}
          {item.subLinks && <ArrowIcon className="arrow" />}
        </Link>

        {item.subLinks && (
          <ul
            className={`${
              showMenu === index ? "block" : "hidden"
            } bg-primary-dark text-surface-dark top-8 dropdown`}
          >
            {item.subLinks.map((subLink, subIndex) => (
              <li key={subIndex} className="text-left child-list-item">
                <Divider
                  key={subIndex + 100}
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                />
                <Link href={subLink.url} className="child-link body1">
                  {subLink.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Divider
          key={index + 122}
          dark={true}
          style={{ borderColor: "rgba(255,255,255,0.5)" }}
        />
      </li>
    );
  });

  return (
    <>
      <AppBarStyled
        position="fixed"
        sx={{
          display: {
            xs: "block",
            lg: "none",
          },
          background: pathname.includes("blogs")
            ? "var(--dark-surface-container)"
            : "var(--dark-surface-container)",
        }}
      >
        <Container maxWidth="xl" sx={{ padding: "0 6px !important" }}>
          <Toolbar disableGutters>
            <Box sx={{ width: "100%" }} id="menu-container">
              <div className="menu-logo-wrapper">
                <IconButton
                  size="small"
                  aria-label="Open navigation menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleDrawerOpen}
                  disableRipple={true}
                  className="hamburger-icon"
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
                <Link href="/" className="logo-wrapper">
                  <Image
                    src="/logo.png"
                    width={72}
                    height={33}
                    alt={`${process.env.name} Logo`}
                    quality={100}
                  />
                </Link>
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBarStyled>
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          zIndex: "100",
        }}
        role="presentation"
        id="menu-appbar"
      >
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "var(--dark-surface-container-high)",
            },
          }}
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIconStyle />
              ) : (
                <ChevronRightIconStyle />
              )}
            </IconButton>
          </DrawerHeader>
          <ListContainer>{menuItems}</ListContainer>
          <Link href="/reservation" style={{ margin: "16px" }}>
            <Button
              size="large"
              variant="outlined"
              className="button"
              onClick={handleDrawerClose}
              sx={{
                border: "1px solid white",
                color: "white",
                width: "100%",
                "&:hover": {
                  border: "1px solid #eaeaea",
                },
              }}
            >
              MAKE RESERVATION
            </Button>
          </Link>
        </Drawer>
      </Box>
    </>
  );
}

const AppBarStyled = styled(AppBar)`
  backdrop-filter: blur(7.6px);

  .menu-logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo-wrapper {
  }
  .hamburger-icon {
    svg {
      path {
        fill: var(--dark-primary);
      }
    }
  }
`;

const ListContainer = styled.ul`
  margin: 0;
  padding: 0;
  .block {
    display: block;
    margin: 0;
    padding: 0;
  }
  .hidden {
    margin: 0;
    padding: 0;
    display: none;
  }

  .parent-list-item {
    .parent-link {
      display: block;
      text-align: left;
      padding: 16px 16px;
      color: white;
      font-weight: 500;

      position: relative;
      &:hover {
        color: #ebebeb;
      }
      &.active {
        color: #f0f0f0;
      }
    }
    svg {
      position: absolute;
      right: 24px;
      top: 24px;
      transform: rotate(180deg);
      path {
        fill: white !important;
      }
    }
  }
  .child-list-item {
    .child-link {
      display: block;
      text-align: left;
      padding: 16px 40px;
      color: #dedede;
      font-weight: 400;
      position: relative;
      &:hover {
        color: #ebebeb;
      }
    }
  }
`;

const ChevronLeftIconStyle = styled(ChevronLeftIcon)`
  path {
    fill: white !important;
  }
`;
const ChevronRightIconStyle = styled(ChevronLeftIcon)`
  path {
    fill: white !important;
  }
`;
