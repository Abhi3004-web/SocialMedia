
import AuthLayout from "../components/AuthLayout";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const verifyAccount = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/users/verify-email",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token,
                    }),
                }
            );

            const result = await response.json();

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
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#C9385F] px-4 py-8 sm:px-6">
            {/* Decorative Shapes */}
            <div
                aria-hidden="true"
                className="absolute top-0 left-0 h-40 w-40 rounded-full bg-linear-to-br from-[#C9385F] via-[#f34a71] to-[#fb415d] md:h-72 md:w-72"
            />

            <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-linear-to-br from-[#C9385F] via-[#f34a71] to-[#fb415d] md:h-96 md:w-96"
            />

            <section className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-md bg-white shadow-2xl md:flex-row">
                {/* Left Side */}
                <aside className="relative flex h-48 items-center justify-center bg-gradient-to-b from-[#D93F68] to-[#f64e67] p-8 md:h-auto md:w-[40%] md:p-12">
                    <header className="text-white">
                        <h1 className="text-3xl font-bold md:text-5xl">
                            "Email Verification"
                        </h1>

                        <hr className="mt-3 h-1 w-14 border-0 bg-white" />
                    </header>


                </aside>

                {/* Right Side */}
                <section className="flex flex-1 flex-col justify-center bg-white px-6 py-12 sm:px-8 md:px-14">

                    <article>
                        {verified ? (
                            <div>
                                <h2 className="text-2xl font-bold text-green-500">
                                    Email Verified!
                                </h2>
                                <p className="text-gray-600">
                                    Your email has been successfully verified.
                                </p>
                                <button
                                    onClick={() => navigate("/")}
                                    className="mt-4 rounded bg-[#D93F68] px-6 py-2 text-white"
                                >
                                    Login
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-gray-600 mb-4">Verify Your Email</h2>

                                <button type="button" className="bg-[#D93F68] px-8 py-3 text-white shadow-md transition hover:scale-105"
                                    onClick={verifyAccount}
                                    disabled={loading}
                                >
                                    {loading ? "Verifying..." : "Verify Account"}
                                </button>
                            </div>
                        )}
                    </article>

                </section>
            </section>
        </main>
    );
}