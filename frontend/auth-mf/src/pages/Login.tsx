import React from 'react'
import AuthLayout from "../components/AuthLayout";
interface LoginProps {
    onLogin?: (token: string) => void;
}
const Login = ({ onLogin }: LoginProps) => {
    return (
        <AuthLayout
            defaultMode="login"
            onLogin={onLogin}
        />
    );
};

export default Login;