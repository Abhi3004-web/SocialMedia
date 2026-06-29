// import { useState } from "react";
// import LoginForm from "./LoginForm";
// import RegistrationForm from "./RegistrationForm";
// import { useNavigate } from "react-router-dom";

// interface AuthLayoutProps {
//   defaultMode?: "login" | "signup";
//   onLogin?: (token: string) => void;
// }

// export default function AuthLayout({ defaultMode = "signup", onLogin }: AuthLayoutProps) {
//   const [isSignUp, setIsSignUp] = useState(
//     defaultMode === "signup"
//   );
//   //const navigate = useNavigate();
//   return (
//     <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#C9385F] px-4 py-8 sm:px-6">
//       {/* Decorative Shapes */}
//       <div
//         aria-hidden="true"
//         className="absolute top-0 left-0 h-40 w-40 rounded-full bg-gradient-to-br from-[#C9385F] via-[#f34a71] to-[#fb415d] md:h-72 md:w-72"
//       />

//       <div
//         aria-hidden="true"
//         className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-gradient-to-br from-[#C9385F] via-[#f34a71] to-[#fb415d] md:h-96 md:w-96"
//       />

//       <section className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-md bg-white shadow-2xl md:flex-row">
//         {/* Left Side */}
//         <aside className="relative flex h-48 items-center justify-center bg-gradient-to-b from-[#D93F68] to-[#f64e67] p-8 md:h-auto md:w-[40%] md:p-12">
//           <header className="text-white">
//             <h1 className="text-3xl font-bold md:text-5xl">
//               {isSignUp ? "Sign Up" : "Sign In"}
//             </h1>

//             <hr className="mt-3 h-1 w-14 border-0 bg-white" />
//           </header>

//           <button
//             type="button"
//             aria-label={`Switch to ${isSignUp ? "Login" : "Sign Up"
//               } form`}
//             onClick={() =>
//               setIsSignUp(!isSignUp)}
//             className="absolute
//               -bottom-7
//               left-1/2
//               z-10
//               flex
//               h-14
//               w-14
//               -translate-x-1/2
//               items-center
//               justify-center
//               rounded-full
//               bg-[#E44C74]
//               text-3xl
//               font-bold
//               text-white
//               shadow-lg
//               transition
//               hover:scale-105
//               md:bottom-auto
//               md:left-auto
//               md:-right-7
//               md:top-1/2
//               md:-translate-y-1/2
//               md:translate-x-0"
//           >
//             →
//           </button>
//         </aside>

//         {/* Right Side */}
//         <section className="flex flex-1 flex-col justify-center bg-white px-6 py-12 sm:px-8 md:px-14">
//           <nav
//             aria-label="Authentication options"
//             className="mb-8 flex flex-wrap justify-center gap-2 md:justify-end"
//           >
//             <button
//               type="button"
//               onClick={() => setIsSignUp(true)}
//               className={`px-4 py-2 text-sm font-medium transition ${isSignUp
//                 ? "bg-[#C9385F] text-white"
//                 : "bg-gray-100 text-[#C9385F]"
//                 }`}
//             >
//               SIGN UP
//             </button>

//             <button
//               type="button"
//               onClick={() => setIsSignUp(false)}
//               className={`px-4 py-2 text-sm font-medium transition ${isSignUp
//                 ? "bg-gray-100 text-[#C9385F]"
//                 : "bg-[#C9385F] text-white"
//                 }`}
//             >
//               LOGIN
//             </button>
//           </nav>

//           <article>
//             {isSignUp ? (
//               <RegistrationForm />
//             ) : (
//               <LoginForm onLogin={onLogin} />
//             )}
//           </article>
//         </section>
//       </section>
//     </main>
//   );
// }

import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

interface AuthLayoutProps {
  defaultMode?: "login" | "signup";
  onLogin?: (token: string) => void;
}

export default function AuthLayout({
  defaultMode = "signup",
  onLogin,
}: AuthLayoutProps) {
  const [isSignUp, setIsSignUp] = useState(defaultMode === "signup");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#C9385F",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Circles */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: { xs: 160, md: 280 },
          height: { xs: 160, md: 280 },
          borderRadius: "50%",
          background:
            "linear-gradient(135deg,#C9385F,#f34a71,#fb415d)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: { xs: 220, md: 380 },
          height: { xs: 220, md: 380 },
          borderRadius: "50%",
          background:
            "linear-gradient(135deg,#C9385F,#f34a71,#fb415d)",
        }}
      />

      <Paper
        elevation={10}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            background:
              "linear-gradient(to bottom,#D93F68,#f64e67)",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            minHeight: { xs: 220, md: "auto" },
            p: 5,
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold" }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Typography>

            <Box
              sx={{
                width: 60,
                height: 4,
                bgcolor: "#fff",
                mt: 2,
              }}
            />
          </Box>

          {/* Floating Button */}
          <IconButton
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{
              position: "absolute",
              bgcolor: "#E44C74",
              color: "#fff",
              width: 60,
              height: 60,
              boxShadow: 5,
              "&:hover": {
                bgcolor: "#D93F68",
              },

              bottom: { xs: -30, md: "50%" },
              right: { xs: "50%", md: -30 },
              transform: {
                xs: "translateX(50%)",
                md: "translateY(50%)",
              },
            }}
          >
            <ArrowForwardIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* Right Panel */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#fff",
            p: { xs: 4, md: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: {
                xs: "center",
                md: "flex-end",
              },
              mb: 4,
            }}
          >
            <Button
              variant={isSignUp ? "contained" : "outlined"}
              onClick={() => setIsSignUp(true)}
              sx={{
                bgcolor: isSignUp ? "#C9385F" : "#f5f5f5",
                color: isSignUp ? "#fff" : "#C9385F",
                borderColor: "#C9385F",
                "&:hover": {
                  bgcolor: "#D93F68",
                  color: "#fff",
                },
              }}
            >
              SIGN UP
            </Button>

            <Button
              variant={!isSignUp ? "contained" : "outlined"}
              onClick={() => setIsSignUp(false)}
              sx={{
                bgcolor: !isSignUp ? "#C9385F" : "#f5f5f5",
                color: !isSignUp ? "#fff" : "#C9385F",
                borderColor: "#C9385F",
                "&:hover": {
                  bgcolor: "#D93F68",
                  color: "#fff",
                },
              }}
            >
              LOGIN
            </Button>
          </Stack>

          {isSignUp ? (
            <RegistrationForm />
          ) : (
            <LoginForm onLogin={onLogin} />
          )}
        </Box>
      </Paper>
    </Box>
  );
}