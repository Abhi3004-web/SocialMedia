import React, { Suspense, useState, } from "react";

import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";

const Login = React.lazy(() => import("authmf/Login"));

const Dashboard = React.lazy(() => import("profilemf/Dashboard"));

function App() {
  const [user, setUser] = useState(localStorage.getItem("token") || null);

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

          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard />
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