import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
const active = {
  color: "var(--light-on-surface, #1d1b16)",
  fontWeight: "500",
  borderLeft: "2px solid var(--light-on-surface, #1d1b16)",
};
function CategoryFilters({ filterArray }) {
  const router = useRouter();
  const params = useParams();

  const [activeItem, setActiveItem] = useState("");

  const filterList = filterArray.map((category, index) => {
    const categoryValue = category.value;
    return (
      <li key={index}>
        <Link
          onClick={() => setActiveItem(categoryValue)}
          className={activeItem === categoryValue ? "active" : ""}
          href={`#${categoryValue}`}
        >
          {category.label}
        </Link>
      </li>
    );
  });
  return (
    <Container className="hidden md:block">
      <ul className="sidebar py-16">{filterList}</ul>
    </Container>
  );
}

export default CategoryFilters;

const Container = styled.section`
  width: 300px;
  height: auto;

  .sidebar {
    position: sticky;
    top: -40px;
    li {
      .active {
        color: var(--light-on-surface, #1d1b16);
        font-weight: 500;

        border-left: 2px solid var(--light-on-surface, #1d1b16);
      }
      a {
        color: var(--light-on-surface-variant, #4c4639);
        font-weight: 400;
        display: block;
        margin: 8px 0;
        padding: 4px 8px;
        font-size: var(--material-theme--body--large);
        &:hover {
          color: var(--light-on-surface, #1d1b16);
          font-weight: 500;

          border-left: 2px solid var(--light-on-surface, #1d1b16);
        }
      }
    }
  }
`;
