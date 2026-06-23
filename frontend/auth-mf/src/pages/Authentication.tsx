import { Routes, Route } from "react-router-dom";
import AuthLayout from '../components/AuthLayout'
import VerifyEmail from "./VerifyEmail";

function Authentication() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AuthLayout />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
            </Routes>
        </>
    )
}

export default Authentication
