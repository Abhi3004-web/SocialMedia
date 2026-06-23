import Input from "../utils/Input";
import { login as loginUser } from "../apis/auth.service";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginFormData = {
    email: string;
    password: string;
};
function LoginForm() {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await loginUser({
                email: data.email,
                password: data.password
            });
            setIsSuccess(result.success);
            console.log("Login result:", result);
            if (result.success) {
                localStorage.setItem(
                    "accessToken",
                    result.data.token
                );
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsSuccess(true);
        }
    };

    return (
        !isSuccess ? (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input
                        label="EMAIL"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <Input
                        label="PASSWORD"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit" disabled={isSubmitting}
                    className="bg-[#D93F68] px-8 py-3 text-white shadow-md transition hover:scale-105"
                >
                    {isSubmitting ? "Logging in..." : "LOGIN"}
                </button>
            </form>
        ) : (
            <div className="text-center">
                <p className="text-green-500">Login successful!</p>
            </div>
        )
    );
}
export default LoginForm;