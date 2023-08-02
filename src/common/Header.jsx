import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isLoginedIn, setIsLoginedIn] = useState(false);
  const [email, setEmail] = useState();

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 로그인 상태 감지
    // onAuthStateChanged는 유저 상태의 변화가 있을 때 실행되는 메소드
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoginedIn(true);
        setEmail(user.email);
      } else {
        setIsLoginedIn(false);
      }
    });

    return () => unsubscribe(); // 컴포넌트가 언마운트될 때 이벤트 구독 해제
  }, [auth]);

  // 로그아웃 시 호출되는 함수 // 새로고침 안됨
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      console.log("로그아웃 성공");
      //setIsLoginedIn(false); // 로그아웃 시 로그인 상태를 false로 업데이트
      //window.location.replace("/");
      navigate("/"); // 로그아웃 시 메인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 실패:", error.message);
    }
  };

  return (
    <header
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px 0 24px",
      }}
    >
      <h1
        style={{
          color: "gray",
          cursor: "pointer",
        }}
      >
        <Link to="/">
          <FaHome />
        </Link>
      </h1>
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        {isLoginedIn ? (
          <>
            {email}
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
}
