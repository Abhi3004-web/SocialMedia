import { Routes, Route } from "react-router-dom";
import './App.css'
import AuthLayout from './components/AuthLayout'
import VerifyEmail from "./validation/VerifyEmail";


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </>
  )
}

export default App
