"use client";

import React from "react";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleButtonClick = async () => {
    if (user) {
      try {
        await addDoc(collection(db, "clicks"), {
          uid: user.uid,
          email: user.email,
          clickedAt: new Date(),
        });
        console.log("Click data saved");
      } catch (error) {
        console.error("Error saving click data:", error);
      }
    }
  };

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
          <a
            onClick={() => router.push("/login")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            로그인
          </a>{" "}
          을 해주세요
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={handleButtonClick}
        style={{ fontSize: "24px", padding: "10px 20px", marginBottom: "20px" }}
      >
        Click Me!
      </button>
      <button
        onClick={handleLogout}
        style={{ fontSize: "16px", padding: "10px 20px" }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Home;
