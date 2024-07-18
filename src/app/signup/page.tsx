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

  // React.FormEvent로 인해 제출 버튼을 누르면 서버로 폼을 제출하지만 e.preventDefault로 그것을 방지하고 자바스크립트 코드를 사용하여 제출한다
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // firebase Auth로 회원가입
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // firestore에 새로운 id 추가
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
