import { Box, Button } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { signUp } from "../../../apis/userApi";
import {
  useNavigate,
  useNavigationType,
  useSearchParams,
} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUserContext } from "../../../context/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
export default function SignUp({ handleCloseSignUp, handleOpenSignIn }) {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "string",
    },
  });

  const {
    mutate: handleSignUp,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signUp(payload),
    onSuccess: () => {
      handleCloseSignUp();
      handleOpenSignIn();
    },
  });

  const successSignUp = () => handleCloseSignUp();

  const onSubmitSignUp = (values) => {
    handleSignUp(values);

    //Gọi API đăng kí
  };

  const onErrorSignUp = (error) => {
    console.log(error);

    //Gọi API đăng kí
  };
  return (
    <Box sx={{ ...styleSign, width: 400 }}>
      <div>
        <h2>Đăng ký</h2>
        <p>Nhanh chóng và dễ dàng.</p>
      </div>
      <hr />
      <div>
        <form onSubmit={handleSubmit(onSubmitSignUp, onErrorSignUp)}>
          <div>
            <label htmlFor="emailSignUp">Email</label>
            <input
              id="emailSignUp"
              {...register("email")}
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="passwordSignUp">Mật Khẩu</label>
            <input
              id="passwordSignUp"
              {...register("password")}
              placeholder="Mât khẩu"
            />
          </div>
          <div>
            <label htmlFor="nameSignUp">Họ và Tên</label>
            <input
              id="nameSignUp"
              {...register("name")}
              placeholder="Họ và tên"
            />
          </div>
          <div>
            <label htmlFor="birthdaySignUp">Ngày tháng năm sinh</label>
            <input
              id="birthdaySignUp"
              {...register("birthday")}
              placeholder="Ngày tháng năm sinh"
            />
          </div>
          <div>
            <label htmlFor="phoneSignUp">Số điện thoại</label>
            <input
              id="phoneSignUp"
              {...register("phone")}
              placeholder="Số di động"
            />
          </div>
          <div>
            <label htmlFor="genderSignUp">Giới tính</label>
            <input
              id="genderSignUp"
              {...register("gender")}
              placeholder="Giới tính"
            />
          </div>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            Đăng ký
          </Button>
        </form>
      </div>
    </Box>
  );
}
