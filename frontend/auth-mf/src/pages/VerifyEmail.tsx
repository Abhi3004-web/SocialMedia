
// import { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { verifyEmail as verifyEmailService } from "../apis/auth.service";

// export default function VerifyEmail() {
//     const [searchParams] = useSearchParams();
//     const [verified, setVerified] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const token = searchParams.get("token");
//     const navigate = useNavigate();

//     const verifyAccount = async () => {
//         try {
//             setLoading(true);
//             const result = await verifyEmailService({ token: token || "" });

//             if (result.success) {
//                 setVerified(true);
//             }
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#C9385F] px-4 py-8 sm:px-6">
//             {/* Decorative Shapes */}
//             <div
//                 aria-hidden="true"
//                 className="absolute top-0 left-0 h-40 w-40 rounded-full bg-linear-to-br from-[#C9385F] via-[#f34a71] to-[#fb415d] md:h-72 md:w-72"
//             />

//             <div
//                 aria-hidden="true"
//                 className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-linear-to-br from-[#C9385F] via-[#f34a71] to-[#fb415d] md:h-96 md:w-96"
//             />

//             <section className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-md bg-white shadow-2xl md:flex-row">
//                 {/* Left Side */}
//                 <aside className="relative flex h-48 items-center justify-center bg-gradient-to-b from-[#D93F68] to-[#f64e67] p-8 md:h-auto md:w-[40%] md:p-12">
//                     <header className="text-white">
//                         <h1 className="text-3xl font-bold md:text-5xl">
//                             "Email Verification"
//                         </h1>

//                         <hr className="mt-3 h-1 w-14 border-0 bg-white" />
//                     </header>


//                 </aside>

//                 {/* Right Side */}
//                 <section className="flex flex-1 flex-col justify-center bg-white px-6 py-12 sm:px-8 md:px-14">

//                     <article>
//                         {verified ? (
//                             <div>
//                                 <h2 className="text-2xl font-bold text-green-500">
//                                     Email Verified!
//                                 </h2>
//                                 <p className="text-gray-600">
//                                     Your email has been successfully verified.
//                                 </p>
//                                 <button
//                                     onClick={() => navigate("/")}
//                                     className="mt-4 rounded bg-[#D93F68] px-6 py-2 text-white"
//                                 >
//                                     Login
//                                 </button>
//                             </div>
//                         ) : (
//                             <div>
//                                 <h2 className="text-gray-600 mb-4">Verify Your Email</h2>

//                                 <button type="button" className="bg-[#D93F68] px-8 py-3 text-white shadow-md transition hover:scale-105"
//                                     onClick={verifyAccount}
//                                     disabled={loading}
//                                 >
//                                     {loading ? "Verifying..." : "Verify Account"}
//                                 </button>
//                             </div>
//                         )}
//                     </article>

//                 </section>
//             </section>
//         </main>
//     );
// }

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail as verifyEmailService } from "../apis/auth.service";

import {
    Box,
    Paper,
    Typography,
    Button,
    CircularProgress,
    Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const verifyAccount = async () => {
        try {
            setLoading(true);

            const result = await verifyEmailService({
                token: token || "",
            });

            if (result.success) {
                setVerified(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#C9385F",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 3,
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    width: "100%",
                    maxWidth: 950,
                    overflow: "hidden",
                    borderRadius: 3,
                }}
            >
                <Grid container>
                    {/* Left Panel */}
                    <Grid
                        size={{ xs: 12, md: 5 }}
                        sx={{
                            background:
                                "linear-gradient(180deg,#D93F68 0%,#f64e67 100%)",
                            color: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 6,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h3"
                                gutterBottom
                                sx={{ fontWeight: "bold" }}
                            >
                                Email Verification
                            </Typography>

                            <Divider
                                sx={{
                                    width: 70,
                                    borderBottomWidth: 4,
                                    bgcolor: "#fff",
                                }}
                            />

                            <Typography
                                variant="body1"
                                sx={{
                                    mt: 4,
                                    opacity: 0.9,
                                    lineHeight: 1.8,
                                }}
                            >
                                Verify your email address to activate your account and
                                continue using the application.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right Panel */}
                    <Grid
                        size={{ xs: 12, md: 7 }}

                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 6,
                        }}
                    >
                        <Box sx={{ width: "100%", maxWidth: 400 }}>
                            {verified ? (
                                <>
                                    <Typography
                                        variant="h4"
                                        gutterBottom
                                        sx={{
                                            fontWeight: "bold",
                                            color: "success.main"
                                        }}


                                    >
                                        Email Verified 🎉
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        sx={{ mb: 4 }}
                                    >
                                        Your email has been successfully verified.
                                        You can now log in to your account.
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        onClick={() => navigate("/")}
                                        sx={{
                                            bgcolor: "#D93F68",
                                            "&:hover": {
                                                bgcolor: "#bf3158",
                                            },
                                        }}
                                    >
                                        Go to Login
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Typography
                                        variant="h4"
                                        gutterBottom
                                        sx={{ fontWeight: "bold" }}


                                    >
                                        Verify Your Email
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        sx={{ mb: 4 }}
                                    >
                                        Click the button below to verify your email
                                        address.
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        onClick={verifyAccount}
                                        disabled={loading}
                                        sx={{
                                            bgcolor: "#D93F68",
                                            py: 1.5,
                                            "&:hover": {
                                                bgcolor: "#bf3158",
                                            },
                                        }}
                                    >
                                        {loading ? (
                                            <CircularProgress
                                                size={24}
                                                sx={{ color: "#fff" }}
                                            />
                                        ) : (
                                            "Verify Account"
                                        )}
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}