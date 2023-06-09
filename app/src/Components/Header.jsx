import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../utils/ContextApi";

export default function Header() {
  const { handleLoggedOut } = useContext(DataContext);
  return (
    <>
      <Box>
        <Container maxWidth="lg">
          <Stack
            py={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <img src="/logo192.png" alt="Logo" width="60px" />
            </Link>
            <Stack direction="row" justifyContent="space-between" gap={5}>
              <Link
                to="/user"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography>user</Typography>
              </Link>
              <Link
                to="/admin"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography>admin</Typography>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography>Login</Typography>
              </Link>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography>SignUp</Typography>
              </Link>

              <Button onClick={() => handleLoggedOut()}>logout</Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
