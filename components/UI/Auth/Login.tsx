
"use client";
import { signIn } from "next-auth/react";

import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import React from "react";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import LoginForm from "../Forms/LoginForm";

export default function Register() {
  return (
    <Section>
      <Container maxWidth="sm" className="container">
        <Paper className="wrapper" variant="outlined">
          <div className="form-wrapper">
           <LoginForm className="login-form" /> 
          </div>
        </Paper>
      </Container>
    </Section>
  );
}
const Section = styled.section`
display: flex; 
min-height: 100vh;
justify-content: center;
align-items: center;
  .container {
.wrapper{ 
  padding: 32px; 
}
  }
`;

