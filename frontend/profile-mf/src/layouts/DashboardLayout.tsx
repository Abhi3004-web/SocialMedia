import { ReactNode } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100">
            <div
                style={{
                    display: "flex",
                    height: "100vh",
                }}
            >
                <Sidebar />

                <Box
                    sx={{
                        flex: 1,
                        overflow: "auto",
                        p: 3,
                        bgcolor: "#fafafa",
                    }}
                >
                    <Header />

                    {children}
                </Box>
            </div>
        </div>
    );
}