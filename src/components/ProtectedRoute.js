// components/ProtectedRoute.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../utils/auth-jar";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth()) {
      navigate("/main"); // Redirect to the main page if the user is authenticated
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
