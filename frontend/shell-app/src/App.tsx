import React, { Suspense, useEffect, useState, } from "react";

import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";

const Login = React.lazy(() => import("authmf/Login"));
const VerifyEmail = React.lazy(() => import("authmf/VerifyEmail"));
const Dashboard = React.lazy(() => import("profilemf/Dashboard"));

function App() {
  const [user, setUser] = useState(localStorage.getItem("token") || null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate
                  to="/dashboard"
                />
              ) : (
                <Login
                  onLogin={(token: string) => {
                    localStorage.setItem("token", token);
                    setUser(token);
                  }}
                />
              )
            }
          />
          {/* Email Verification */}
          <Route
            path="/verify-email"
            element={<VerifyEmail />}
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
