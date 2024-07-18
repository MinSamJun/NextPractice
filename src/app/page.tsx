"use client"; // 클라이언트 측에서 만들도록 설정, firebase때문에 설정함

import React from "react";
// 애플리케이션의 인증 상태를 확인하는 react의 기능
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
// firebase의 메일인증과 firestore를 사용하기 위해 가져옴
import { auth, db } from "../firebase";
// firebase의 auth에서 로그아웃을 담당하는 기능
import { signOut } from "firebase/auth";
// firebase의 firestore에서 컬렉션(테이블)을 참조 | 컬렉션에 도튜먼트(키-값으로 이루어진 튜플)을 넣기 위한 기능
import { collection, addDoc } from "firebase/firestore";

// 메인 컴포넌트
const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // 로그아웃 성공시 login페이지로 리디렉션
      router.push("/login");
    } catch (error) {
      // 실패시 오류 메시지
      console.error("Logout error:", error);
    }
  };

  // 버튼 클릭 함수
  const handleButtonClick = async () => {
    if (user) {
      try {
        // 클릭 할때마다 유저의 정보와 시간을 firestore의 clicks라는 컬렉션에 추가한다ㅏ
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

  // 로그인이 되지 않은 경우 보여줄 페이지
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
          {/* 로그인 페이지로 넘기기 */}
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

  // 로그인이 된 경우에 보여줄 페이지
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
      {/* 버튼을 누를 때마다 버튼 클릭 함수 실행 */}
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
