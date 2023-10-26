import React from "react";
import { AppBar, Toolbar, Box, Typography, Container } from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" variant="elevation" color="inherit">
        <Toolbar>
          {/* LOGO */}
          <Typography variant="h6" component="div">
            LOGO
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
