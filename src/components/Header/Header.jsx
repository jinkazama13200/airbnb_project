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
  FormControl,
  Select,
  Modal,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import { colorConfigs } from "../../configs/colorConfigs";
import AirBnb from "../../assets/img/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import DatePicker from "../DatePicker/DatePicker";
import { useQuery } from "@tanstack/react-query";
import { getLocation } from "../../apis/positionAPI";
import { useNavigate } from "react-router-dom";
import SignUp from "../../module/Auth/SignUp/SignUp";
import SignIn from "../../module/Auth/SignIn/SignIn";
import { useUserContext } from "../../context/UserContext";

const Logo = styled("a")`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;
const MainButton = styled(Button)`
  border-radius: 50px;
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

const SearchButton = styled(Button)`
  &.MuiButton-root {
    background-color: ${colorConfigs.color.primary.main};
    border-radius: 50px;
  }
`;

const StyledSelect = styled(Select)`
  &::after {
    border-bottom: 2px solid ${colorConfigs.color.primary.main};
  }
  width: 150px;
`;

const StyledBox = styled(Box)`
  padding: 10px 20px;
  border-radius: 32px;
  cursor: pointer;
`;

const styleSign = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [locationSelected, setLocationSelected] = useState("");
  const [focusedBox, setFocusedBox] = useState(null);

  const open = Boolean(anchorEl);

  //check user form context
  const { currentUser, handleSignOutContext } = useUserContext();

  const [openSignIn, setOpenSignIn] = useState(false);
  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };
  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  const [openSignUp, setOpenSignUp] = useState(false);
  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };
  const handleCloseSignUp = () => {
    console.log("dã chạy");
    setOpenSignUp(false);
  };

  const { data: location = [] } = useQuery({
    queryKey: ["locations"],
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

  const handleSelectedLocation = () => {
    if (!locationSelected) return;
    navigate(`roomlist/${locationSelected}`);
    setLocationSelected("");
  };

  const renderLocation = (array) => {
    return array.map((item) => {
      return (
        <MenuItem value={item.id} key={item.id}>
          {item.tenViTri}, {item.tinhThanh}, {item.quocGia}
        </MenuItem>
      );
    });
  };

  // Kiểm tra user có đăng nhập hay chưa

  if (currentUser !== null) {
    console.log("có đăng nhâp");
  }

  return (
    <>
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
              <Logo onClick={() => window.location.replace("/")}>
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
                  currentUser ? (
                    <Avatar src={currentUser?.avatar} alt={currentUser?.name} />
                  ) : (
                    <AccountCircleIcon sx={{ fontSize: "40px !important" }} />
                  )
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
              maxWidth="fit-content"
              sx={{
                bgcolor: focusedBox === 0 ? "white" : "",
                borderRadius: focusedBox === 0 ? "32px" : "",
                boxShadow:
                  focusedBox === 0 ? ` rgba(0, 0, 0, 0.35) 0px 5px 15px` : "",
              }}
              autoComplete="off"
              component="div"
            >
              <Typography variant="subtitle2">Địa điểm</Typography>
              <FormControl>
                <StyledSelect
                  value={locationSelected}
                  onChange={(e) => {
                    setLocationSelected(e.target.value);
                  }}
                  label="Chọn địa điểm đến"
                  variant="standard"
                  sx={{
                    bgcolor: focusedBox === 1 ? "white" : "",
                    borderRadius: focusedBox === 1 ? "32px" : "",
                    boxShadow:
                      focusedBox === 1
                        ? ` rgba(0, 0, 0, 0.35) 0px 5px 15px`
                        : "",
                  }}
                  component="div"
                  onFocus={() => handleBoxFocus(0)}
                  onBlur={handleBoxBlur}
                >
                  {location && renderLocation(location)}
                </StyledSelect>
              </FormControl>
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
              <DatePicker variant="standard" type="date" />
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
              <DatePicker variant="standard" type="date" />
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
              <SearchButton
                onClick={handleSelectedLocation}
                variant="contained"
              >
                <SearchIcon />
              </SearchButton>
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
            {!currentUser ? (
              <MenuItem onClick={handleOpenSignIn}>Đăng Nhập</MenuItem>
            ) : null}
            {!currentUser ? (
              <MenuItem onClick={handleOpenSignUp}>Đăng Ký</MenuItem>
            ) : null}
            {currentUser && (
              <MenuItem onClick={handleSignOutContext}>Đăng xuất</MenuItem>
            )}
            <Divider />
            <MenuItem>Cho thuê chỗ ở qua AirBnb</MenuItem>
            <MenuItem>Trung tâm trợ giúp</MenuItem>
          </Menu>
        </AppBar>
      </Box>

      {/* Modal Sign In user  */}

      <Modal
        open={openSignIn}
        onClose={handleCloseSignIn}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div>
          <SignIn handleCloseSignIn={handleCloseSignIn} />
        </div>
      </Modal>

      {/* Modal Sign Up user  */}
      <Modal
        open={openSignUp}
        onClose={handleCloseSignUp}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div>
          <SignUp
            handleCloseSignUp={handleCloseSignUp}
            handleOpenSignIn={handleOpenSignIn}
          />
        </div>
      </Modal>
    </>
  );
}
