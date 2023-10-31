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
  ListItemButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import AirBnb from "../../assets/img/logo.png";
import { colorConfigs } from "../../configs/colorConfigs";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import DatePicker from "../DatePicker/DatePicker";
import { useQuery } from "@tanstack/react-query";
import { getLocation } from "../../apis/positionAPI";

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

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

const StyledBox = styled(Box)`
  padding: 10px 20px;
  border-radius: 32px;
  cursor: pointer;
`;

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [focusedBox, setFocusedBox] = useState(null);
  const open = Boolean(anchorEl);

  const { data: location = [] } = useQuery({
    queryKey: ["location"],
    queryFn: getLocation,
  });

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleBoxFocus = (box) => {
    setFocusedBox(box);
  };
  const handleBoxBlur = () => {
    setFocusedBox(null);
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
      <AppBar position="static" variant="elevation" color="inherit">
        <Toolbar sx={{ transition: "0.3s all" }}>
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
            {/* List Buttons*/}
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

        {/* Search System */}
        <Box
          sx={{
            bgcolor: focusedBox !== null ? "lightgrey" : "",
            display: "flex",
            borderRadius: "50px",
            border: "1px solid lightgrey",
            m: "auto",
            marginBottom: "10px",
            transition: "0.3s ease-in-out",
          }}
          autoComplete="off"
          component="div"
        >
          {/* Find Location Part */}
          <StyledBox
            sx={{
              bgcolor: focusedBox === 0 ? "white" : "",
              borderRadius: focusedBox === 0 ? "32px" : "",
              boxShadow:
                focusedBox === 0 ? ` rgba(0, 0, 0, 0.35) 0px 5px 15px` : "",
            }}
            component="div"
            onFocus={() => handleBoxFocus(0)}
            onBlur={handleBoxBlur}
          >
            <Typography variant="subtitle2">Địa điểm</Typography>
            <StyledTextField
              variant="standard"
              type="search"
              placeholder="Tìm địa điểm đến"
              inputProps={{
                style: {
                  border: "none",
                },
              }}
            />
          </StyledBox>
          {/* Start Date Part */}
          <StyledBox
            sx={{
              bgcolor: focusedBox === 1 ? "white" : "",
              borderRadius: focusedBox === 1 ? "32px" : "",
              boxShadow:
                focusedBox === 1 ? ` rgba(0, 0, 0, 0.35) 0px 5px 15px` : "",
            }}
            component="div"
            onFocus={() => handleBoxFocus(1)}
            onBlur={handleBoxBlur}
          >
            <Typography variant="subtitle2">Nhận phòng</Typography>
            <DatePicker />
          </StyledBox>
          {/* End Date Part */}
          <StyledBox
            sx={{
              bgcolor: focusedBox === 2 ? "white" : "",
              borderRadius: focusedBox === 2 ? "32px" : "",
              boxShadow:
                focusedBox === 2 ? ` rgba(0, 0, 0, 0.35) 0px 5px 15px` : "",
            }}
            component="div"
            onFocus={() => handleBoxFocus(2)}
            onBlur={handleBoxBlur}
          >
            <Typography variant="subtitle2">Trả phòng</Typography>
            <DatePicker />
          </StyledBox>
          {/* Guest Part */}
          <StyledBox
            sx={{
              display: "flex",
              gap: "5px",
              bgcolor: focusedBox === 3 ? "white" : "",
              borderRadius: focusedBox === 3 ? "32px" : "",
              boxShadow:
                focusedBox === 3 ? ` rgba(0, 0, 0, 0.35) 0px 5px 15px` : "",
            }}
            component="div"
            onFocus={() => handleBoxFocus(3)}
            onBlur={handleBoxBlur}
          >
            <Box component="div">
              <Typography variant="subtitle2">Khách</Typography>
              <Typography variant="subtitle2">0</Typography>
            </Box>
            <Button
              variant="contained"
              color={"inherit"}
              sx={{ borderRadius: "32px" }}
            >
              <SearchIcon />
            </Button>
          </StyledBox>
        </Box>

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
