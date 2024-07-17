"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, signInWithEmailAndPassword } from "../../firebase";
import "../globals.css";
import "../../styles/submit.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 오류 메시지 상태 추가
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: any) {
      if (error.code === "auth/invalid-email") {
        setError("유효하지 않은 이메일 형식입니다. 다시 시도해주세요.");
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setError("이메일 또는 비밀번호가 잘못되었습니다. 다시 시도해주세요.");
      } else {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
      console.error("Error during login:", error.code, error.message);
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <form onSubmit={handleSubmit} className="form">
          <h1>로그인</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button">
            로그인
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* 오류 메시지 표시 */}
      </div>
      <div className="linkContainer">
        <p>
          회원이 아니신가요?{" "}
          <a onClick={() => router.push("/signup")} className="link">
            가입하기
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
