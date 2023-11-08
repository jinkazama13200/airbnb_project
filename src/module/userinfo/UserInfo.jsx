import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../apis/userApi";
import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  styled,
  TextField,
  InputLabel,
  Button,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { colorConfigs } from "../../configs/colorConfigs";

const userSchema = object({
  name: string().required("Trường hợp bắt buộc."),
  email: string().required("Trường hợp bắt buộc.").email("Email không hợp lệ."),
  phone: string().required("Trường hợp bắt buộc."),
  birthday: string().required("Trường hợp bắt buộc."),
  gender: string().required("Trường hợp bắt buộc."),
});

const UpdateButton = styled(Button)`
  &.MuiButton-root {
    background-color: ${colorConfigs.color.primary.main};
    text-transform: none;
    font-weight: bold;
  }
  margin: 5px 0;
`;
const CancelButton = styled(Button)`
  &.MuiButton-root {
    background-color: black;
    text-transform: none;
    font-weight: bold;
  }
  margin: 5px 0;
`;

const UserInput = styled(TextField)`
  & .MuiInput-root {
    &::after {
      border-bottom: 2px solid ${colorConfigs.color.primary.main};
    }
  }
`;

const GenderSelect = styled(Select)`
  &::after {
    border-bottom: 2px solid ${colorConfigs.color.primary.main};
  }
`;

export default function UserInfo() {
  const { userId } = useParams();
  const [isEditing, setisEditing] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthday: "",
      gender: "",
    },
    resolver: yupResolver(userSchema),
    mode: "onTouched",
  });

  const { data: user = [] } = useQuery({
    queryKey: ["userInfo", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: () => {
      const userObj = {
        id: userId,
        name: watch("name"),
        email: watch("email"),
        phone: watch("phone"),
        birthday: watch("birthday"),
        gender: watch("gender"),
        role: user?.role,
      };
      return updateUser(userId, userObj);
    },
    onSuccess: () => {
      setisEditing(false);
    },
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("birthday", user.birthday);
      setValue("gender", user.gender);
    }
  }, [user]);

  return (
    <Fragment>
      <Container>
        <Grid mt="50px" spacing={2} component="div" container>
          <Grid item xs={4}>
            <Box component={Paper} p={2}>
              {/* USER IMG */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{ width: "100px", height: "100px" }}
                  src={user.avatar}
                  alt={user.name}
                />
              </Box>
              {/* VERIFIED PART */}
              <Box py={2} component="div">
                <VerifiedUserIcon />
                <Typography
                  fontWeight="bold"
                  variant="subtitle1"
                  component="div"
                >
                  Xác minh danh tính
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="GrayText"
                  component="div"
                >
                  Xác thực danh tính của bạn với huy hiệu danh tinh.
                </Typography>
              </Box>
              <Divider />
              <Box py={2} component="div">
                <Typography fontWeight="bold" variant="h5">
                  {user.name} đã xác nhận
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  component="div"
                >
                  <TaskAltIcon />
                  <Typography variant="subtitle2">Địa chỉ email</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box component={Paper} px={10} py={2}>
              <Box component="div">
                <Typography fontWeight="bold" variant="h4">
                  Xin chào,tôi là {user.name}
                </Typography>
              </Box>
              <Typography
                onClick={() => setisEditing(true)}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                variant="subtitle2"
              >
                Chỉnh sửa hồ sơ
              </Typography>
              {/* USER FORM */}
              <Box component={Paper} p={2} mt={2}>
                <Box
                  onSubmit={handleSubmit(onSubmit)}
                  autoComplete="off"
                  component="form"
                >
                  {/* NAME */}
                  <Box component="div" py={2}>
                    <InputLabel>Họ Tên</InputLabel>
                    <UserInput
                      disabled={!isEditing}
                      variant="standard"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      value={watch("name") || ""}
                      fullWidth
                      {...register("name")}
                    />
                  </Box>
                  <Divider />
                  {/* EMAIL */}
                  <Box component="div" py={2}>
                    <InputLabel>Email</InputLabel>
                    <UserInput
                      disabled={!isEditing}
                      variant="standard"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      value={watch("email") || ""}
                      fullWidth
                      {...register("email")}
                    />
                  </Box>
                  <Divider />
                  {/* PHONE */}
                  <Box component="div" py={2}>
                    <InputLabel>Số ĐT</InputLabel>
                    <UserInput
                      disabled={!isEditing}
                      variant="standard"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      value={watch("phone") || ""}
                      fullWidth
                      {...register("phone")}
                    />
                  </Box>
                  <Divider />
                  {/* BIRTHDAY */}
                  <Box component="div" py={2}>
                    <InputLabel>Ngày Sinh</InputLabel>
                    <UserInput
                      disabled={!isEditing}
                      variant="standard"
                      error={!!errors.birthday}
                      helperText={errors.birthday?.message}
                      value={watch("birthday") || ""}
                      type="date"
                      fullWidth
                      {...register("birthday")}
                    />
                  </Box>
                  <Divider />
                  {/* GENDER */}
                  <Box component="div" py={2}>
                    <InputLabel>Giới Tính</InputLabel>
                    <GenderSelect
                      disabled={!isEditing}
                      variant="standard"
                      error={!!errors.gender}
                      value={watch("gender") || false}
                      fullWidth
                      {...register("gender")}
                    >
                      <MenuItem value={true}>Nam</MenuItem>
                      <MenuItem value={false}>Nữ</MenuItem>
                    </GenderSelect>
                  </Box>
                  <Divider />
                  {isEditing && (
                    <Stack py={2} spacing={2} direction="row">
                      <UpdateButton type="submit" variant="contained">
                        Cập nhật
                      </UpdateButton>
                      <CancelButton
                        onClick={() => setisEditing(false)}
                        variant="contained"
                      >
                        Hủy
                      </CancelButton>
                    </Stack>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
