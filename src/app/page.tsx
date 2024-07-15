"use client";

import React from "react";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>
          Please{" "}
          <a
            onClick={() => router.push("/login")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            login
          </a>{" "}
          to access this page.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button style={{ fontSize: "24px", padding: "10px 20px" }}>
        Click Me!
      </button>
    </div>
  );
};

export default Home;
