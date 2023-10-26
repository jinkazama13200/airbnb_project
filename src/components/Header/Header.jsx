import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import AirBnb from "../../assets/img/logo.png";
import { colorConfigs } from "../../configs/colorConfigs";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Logo = styled("a")`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  &::after {
    position: absolute;
    content: "airbnb";
    right: -50px;
    font-size: 24px;
    font-weight: bold;
    color: ${colorConfigs.color.primary.maim};
  }
`;

const MainButton = styled(Button)`
  margin-left: auto;
  padding: 10px 15px;
  border-radius: 50px;
  transition: 0.2s ease-in-out;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" variant="elevation" color="inherit">
        <Toolbar>
          {/* LOGO */}
          <Logo>
            <Typography
              sx={{ display: "block" }}
              component="img"
              width={100}
              src={AirBnb}
              alt="AirBnb"
            />
          </Logo>
          {/* Signin/Signup Button */}
          <MainButton
            onClick={handleOpenMenu}
            color="inherit"
            variant="outlined"
            aria-label="sing-in-sign-up-button"
            startIcon={<MenuIcon />}
            endIcon={<AccountCircleIcon />}
          />
        </Toolbar>
        {/* Menu open when onclick by MainButton */}
        <Menu
          slotProps={{
            paper: {
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1,
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
        >
          <MenuItem>Đăng Nhập</MenuItem>
          <MenuItem>Đăng Ký</MenuItem>
          <Divider />
          <MenuItem>Cho thuê chỗ ở qua AirBnb</MenuItem>
          <MenuItem>Trung tâm trợ giúp</MenuItem>
        </Menu>
      </AppBar>
    </Box>
  );
}
