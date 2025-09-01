import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:3000/auth/check", {
                    withCredentials: true,
                });
                if (res.data.success) {
                    setAuthenticated(true);
                }
            } catch (err) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!authenticated) return <Navigate to="/login" replace />;

    return children;
};

export default ProtectedRoute;
