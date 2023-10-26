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
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { styled } from "@mui/system";
import AirBnb from "../../assets/img/logo.png";
import { colorConfigs } from "../../configs/colorConfigs";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";

const Logo = styled("a")`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;
const MainButton = styled(Button)`
  border-radius: 50px;
  text-transform: none;
`;
const ListButton = styled(ListItemButton)`
  position: relative;
  transition: 0.3s ease-in-out;
  &::before {
    text-align: center;
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    transform: scale(0);
    background-color: black;
  }
  &:hover {
    background-color: transparent !important;
    &::before {
      transition: 0.3s ease-in-out;
      transform: scale(1);
    }
  }
  &.Mui-selected {
    background-color: transparent;
    &::before {
      text-align: center;
      position: absolute;
      content: "";
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      transform: scale(1);
      background-color: black;
    }
  }
`;

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectedButton = (item) => {
    if (selectedButton === item) {
      setSelectedButton(null);
    } else {
      setSelectedButton(item);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ transition: "0.3s all" }}
        position="static"
        variant="elevation"
        color="inherit"
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0px",
            }}
          >
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
            {/* Search System */}
            <Box sx={{ m: "auto" }} component="div">
              <List sx={{ display: "flex", gap: "10px" }}>
                <ListButton
                  disableTouchRipple
                  onClick={() => handleSelectedButton("item1")}
                  selected={selectedButton === "item1"}
                >
                  Chỗ Ở
                </ListButton>
                <ListButton
                  disableTouchRipple
                  onClick={() => handleSelectedButton("item2")}
                  selected={selectedButton === "item2"}
                >
                  Trải Nghiệm
                </ListButton>
                <ListButton
                  disableTouchRipple
                  onClick={() => handleSelectedButton("item3")}
                  selected={selectedButton === "item3"}
                >
                  Trải Nghiệm Trực Tuyến
                </ListButton>
              </List>
            </Box>
            {/*Choose Language Button */}
            <IconButton>
              <LanguageIcon />
            </IconButton>
            {/* Signin/Signup Button */}
            <MainButton
              onClick={handleOpenMenu}
              color="inherit"
              variant="outlined"
              aria-label="sing-in-sign-up-button"
              startIcon={<MenuIcon />}
              endIcon={
                <AccountCircleIcon sx={{ fontSize: "40px !important" }} />
              }
            />
          </Box>
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
