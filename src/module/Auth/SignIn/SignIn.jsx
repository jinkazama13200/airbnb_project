import React from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { object, string } from "yup";
import { useUserContext } from "../../../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../../apis/userApi";
import { Box, Button } from "@mui/material";

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

export default function SignIn({ handleCloseSignIn }) {
  const { currentUser, handleSignInContext } = useUserContext();

  const [searchParams] = useSearchParams();

  const signInSchema = object({
    email: string().required("Tài khoản không được để trống"),
    password: string()
      .required("Mật khẩu không được để trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Mật khẩu ít nhất 8 kí tự , 1 kí tự hoa và 1 số"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });

  const {
    mutate: handleSignIn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => signIn(payload),
    onSuccess: (data) => {
      handleSignInContext(data);
      handleCloseSignIn();
    },
  });

  const onSubmitSignIn = (values) => {
    handleSignIn(values);
  };

  if (currentUser) {
    const user = searchParams.get("user");
    const booking = searchParams.get("booking");
    const comment = searchParams.get("comment");
    return <Navigate to={user || booking || comment || "/"} replace />;
  }

  return (
    <>
      <Box sx={{ ...styleSign, width: 400 }}>
        <div>
          <h2>Đăng nhập</h2>
        </div>
        <hr />
        <div>
          <form onSubmit={handleSubmit(onSubmitSignIn)}>
            <div>
              <label htmlFor="accountSign">Tài khoản</label>
              <input {...register("email")} id="accountSign" type="text" />
            </div>
            <div>
              <label htmlFor="passSign">Tài khoản</label>
              <input {...register("password")} id="passSign" type="text" />
            </div>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isLoading}
            >
              Đăng Nhập
            </Button>
          </form>
        </div>
      </Box>
    </>
  );
}
