import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../utils/Input";

type RegistrationFormData = {
    username: string;
    email: string;
    password: string;
    terms: boolean;
};
function Registration() {
    const [isSuccess, setIsSuccess] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<RegistrationFormData>();
    const onSubmit = async (data: RegistrationFormData) => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: data.username,
                        email: data.email,
                        password: data.password,
                    }),
                }
            );

            const result = await response.json();
            setIsSuccess(result.success);
            if (!response.ok) {
                throw new Error(result.message || "Registration failed");
            }

            console.log("Registration Success", result);
        } catch (error) {
            console.error("Registration Error", error);
        }
    };

    return (
        !isSuccess ? (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <Input
                        label="USERNAME"
                        placeholder="Enter your username"
                        {...register("username", {
                            required: "Username is required",
                        })}
                    />

                    {errors.username && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                <div>
                    <Input
                        label="EMAIL"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Invalid email address",
                            },
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
                            minLength: {
                                value: 6,
                                message: "Minimum 6 characters required",
                            },
                        })}
                    />

                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <label className="flex items-center gap-2 text-sm text-gray-500">
                    <input
                        type="checkbox"
                        {...register("terms", {
                            required: "Please accept the terms",
                        })}
                    />
                    I agree all statement in terms of service
                </label>

                {errors.terms && (
                    <p className="text-sm text-red-500">
                        {errors.terms.message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#D93F68] px-8 py-3 text-white shadow-md transition hover:scale-105 disabled:opacity-50"
                >
                    {isSubmitting ? "Signing Up..." : "SIGN UP"}
                </button>
            </form>
        ) : (
            <label className="mb-2 block text-sm font-semibold text-[#D93F68]">
                Registration Successful! Please check your email to verify your account.
            </label>
        )
    );
}
export default Registration;