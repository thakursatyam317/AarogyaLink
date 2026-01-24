import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "420px",
          width: "100%",
          background: "#ffffff",
          padding: "32px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: "64px", margin: "0", color: "#ef4444" }}>
          403
        </h1>

        <h2 style={{ margin: "16px 0", color: "#0f172a" }}>
          Access Denied
        </h2>

        <p style={{ color: "#475569", fontSize: "15px", lineHeight: "1.6" }}>
          You do not have permission to access this page.
          Please login with the correct role or go back.
        </p>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "10px 18px",
              borderRadius: "6px",
              border: "1px solid #cbd5f5",
              background: "#ffffff",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "10px 18px",
              borderRadius: "6px",
              border: "none",
              background: "#2563eb",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
