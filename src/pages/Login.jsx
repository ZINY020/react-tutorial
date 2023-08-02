import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { getUserInfo } from "../redux/modules/userSlice";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignin = async () => {
    const auth = getAuth();
    try {
      setError(null); // 이전 에러 초기화
      if (!email || !password) {
        setError("이메일과 비밀번호를 모두 입력해주세요.");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      console.log("로그인 성공:", email);
      window.alert("로그인에 성공했습니다.");
      fetchUserData();
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error.message);
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const fetchUserData = async () => {
    const dbUsers = query(collection(db, "users"), where("email", "==", email));

    const usersData = [];

    const userSnapshot = await getDocs(dbUsers);
    userSnapshot.forEach((doc) => {
      usersData.push(doc.data());
    });
    dispatch(getUserInfo(...usersData));
  };

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}
        >
          <form>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="이메일"
                type="text"
                value={email}
                onChange={handleEmailChange}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                type="button"
                onClick={handleSignin}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                로그인하기
              </button>
            </div>
            <div
              style={{
                width: "360px",
              }}
            >
              <Link to="/signup">
                <button
                  style={{
                    width: "100%",
                    border: "none",
                    padding: "12px",
                    borderRadius: "6px",
                    backgroundColor: "#FF6969",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  회원가입하러 가기
                </button>
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
