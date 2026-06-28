// import Input from "../utils/Input";
// import { login as loginUser } from "../apis/auth.service";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// type LoginFormData = {
//     email: string;
//     password: string;
// };
// interface LoginFormProps {
//     onLogin?: (token: string) => void;
// }
// function LoginForm({ onLogin }: LoginFormProps) {
//    // const navigate = useNavigate();
//     const [isSuccess, setIsSuccess] = useState(false);
//     const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<LoginFormData>();

//     const onSubmit = async (data: LoginFormData) => {
//         try {
//             const result = await loginUser({
//                 email: data.email,
//                 password: data.password
//             });
//             setIsSuccess(result.success);
//             console.log("Login result:", result);
//             if (result.success) {
//                 localStorage.setItem(
//                     "token",
//                     result.data.token
//                 );
//                 onLogin?.(result.data.token);

//             }
//         } catch (error) {
//             console.error("Login error:", error);
//         } finally {
//             setIsSuccess(true);
//         }
//     };

//     return (
//         !isSuccess ? (
//             <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//                 <div>
//                     <Input
//                         label="EMAIL"
//                         placeholder="Enter your email"
//                         {...register("email", {
//                             required: "Email is required",
//                         })}
//                     />
//                     {errors.email && (
//                         <p className="mt-1 text-sm text-red-500">
//                             {errors.email.message}
//                         </p>
//                     )}
//                 </div>

//                 <div>
//                     <Input
//                         label="PASSWORD"
//                         type="password"
//                         placeholder="Enter your password"
//                         {...register("password", {
//                             required: "Password is required",
//                         })}
//                     />
//                     {errors.password && (
//                         <p className="mt-1 text-sm text-red-500">
//                             {errors.password.message}
//                         </p>
//                     )}
//                 </div>

//                 <button
//                     type="submit" disabled={isSubmitting}
//                     className="bg-[#D93F68] px-8 py-3 text-white shadow-md transition hover:scale-105"
//                 >
//                     {isSubmitting ? "Logging in..." : "LOGIN"}
//                 </button>
//             </form>
//         ) : (
//             <div className="text-center">
//                 <p className="text-green-500">Login successful!</p>
//             </div>
//         )
//     );
// }
// export default LoginForm;

import { useState } from "react";
import { Box, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";

import Input from "../utils/Input";
import { login as loginUser } from "../apis/auth.service";

type LoginFormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onLogin?: (token: string) => void;
}

function LoginForm({ onLogin }: LoginFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser({
        email: data.email,
        password: data.password,
      });

      console.log(result);

      if (result.success) {
        setIsSuccess(true);

        localStorage.setItem("token", result.data.token);

        onLogin?.(result.data.token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isSuccess) {
    return (
      <Alert severity="success">
        Login successful!
      </Alert>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Input
        label="EMAIL"
        placeholder="Enter your email"
        {...register("email", {
          required: "Email is required",
        })}
      />

      {errors.email && (
        <Alert severity="error" sx={{ py: 0 }}>
          {errors.email.message}
        </Alert>
      )}

      <Input
        label="PASSWORD"
        type="password"
        placeholder="Enter your password"
        {...register("password", {
          required: "Password is required",
        })}
      />

      {errors.password && (
        <Alert severity="error" sx={{ py: 0 }}>
          {errors.password.message}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{
          alignSelf: "flex-start",
          px: 5,
          py: 1.5,
          bgcolor: "#D93F68",
          "&:hover": {
            bgcolor: "#c22f58",
          },
        }}
      >
        {isSubmitting ? "Logging in..." : "LOGIN"}
      </Button>
    </Box>
  );
}

export default LoginForm;