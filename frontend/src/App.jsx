// 🔹 App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../components/auth component/AuthPage";
import EmailVerificationPage from "../components/auth component/VerifyEmail";
import MainPage from "../components/main components/MainPage";
import ProtectedRoute from "../components/auth component/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import TradeWatcher from "../components/stock data components/TradeWatcher";
import LoadingPage from "../components/top components/LoadingPage";

const App = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        // 🔹 Promise to fetch trades
        const fetchData = axios.get("http://localhost:3000/stocks/user-stocks", { withCredentials: true });
        // 🔹 Minimum 3 sec delay
        const minDelay = new Promise(resolve => setTimeout(resolve, 2000));

        const [res] = await Promise.all([fetchData, minDelay]);

        if (res.data.success) {
          setPositions(res.data.stocks);
        }
      } catch (err) {
        console.error("Failed to fetch trades:", err);
      } finally {
        setLoading(false); // 🔹 stop loading after both fetch & 3s delay
      }
    };

    fetchTrades();
    const interval = setInterval(fetchTrades, 1000); // auto-refresh trades every 1s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <>
      <TradeWatcher positions={positions} />

      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainPage positions={positions} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainPage positions={positions} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
};

export default App;
