"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styled from "@emotion/styled";
export default function BreadCrumb({ className }) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // Split the path into an array to generate breadcrumbs
  return (
    <Nav aria-label="breadcrumb" className={`flex mb-8 ${className}`}>
      {/* Home Link */}
      <Link href="/">
        <span className="link-text">Home</span>
        <span>&nbsp;/&nbsp;</span>
      </Link>

      {/* Generate breadcrumb items dynamically */}
      {pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        // Capitalize the segment for better readability
        const name = segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

        // Last breadcrumb should not be a link
        const isLast = index === pathSegments.length - 1;

        return (
          <div
            key={href}
            className={`breadcrumb-item ${isLast ? "active" : ""}`}
          >
            {isLast ? (
              <span>{name}</span>
            ) : (
              <Link href={href}>
                <span className="link-text">{name}</span>
                <span>&nbsp;/&nbsp;</span>
              </Link>
            )}
          </div>
        );
      })}
    </Nav>
  );
}
const Nav = styled.nav`
  span {
    color: var(--dark-on-surface);
  }
  a {
    color: var(--dark-on-surface-variant);

    .link-text {
      text-decoration: underline;
    }
  }
`;
