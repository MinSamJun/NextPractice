"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, createUserWithEmailAndPassword, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import "../globals.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Firebase Authentication을 사용하여 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firestore에 사용자 데이터 추가
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      console.log("User created:", user);
      router.push("/");
    } catch (error: any) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <form onSubmit={handleSubmit} className="form">
          <h1>회원 가입</h1>
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
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
