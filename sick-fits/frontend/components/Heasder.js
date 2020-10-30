import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Nav from "../components/Nav";
import Router from "next/router";
import Nprogress from "nprogress";

Router.onRouteChangeStart = () => {
  Nprogress.start();
};

const Logo = styled.h1`
  font-size: 3.5rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${(props) => props.theme.blue};
    text-transform: uppercase;
    text-decoration: none;
    color: white;
  }
  @media (max-width: 1300px) {
    text-align: center;
    margin: 0;
  }
`;
const StyledHeader = styled.header``;

function Header() {
  return (
    <div>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a>Perfect Fits</a>
          </Link>
        </Logo>
        <Nav />

        <div className="sub-bar">
          <p>Search</p>
        </div>
        <div>Cart</div>
      </div>
    </div>
  );
}

export default Header;
