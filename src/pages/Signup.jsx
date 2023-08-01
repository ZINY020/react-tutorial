import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { query, collection, where, getDoc, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //fiestore 데이터 조회
  const fetchUserData = async () => {
    try {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDoc(
        query(usersRef, where("email", "==", email))
      );
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    } catch (error) {
      console.error("데이터 조회 실패:", error);
    }
  };

  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setconfirmpassword(e.target.value);
  };

  // 회원가입 버튼 클릭 이벤트 처리 함수
  const handleSignup = async () => {
    const auth = getAuth();

    // 이메일과 비밀번호의 유효성 검사
    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    // 비밀번호와 확인용 비밀번호가 일치하는지 확인
    if (password !== confirmpassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 유효성 검사 추가
    const isPasswordValid = (password) => {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[@$!%*?&]/.test(password);

      return (
        password.length >= 8 &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar
      );
    };

    if (!isPasswordValid(password)) {
      setError(
        "올바른 형식의 비밀번호를 입력해주세요. 비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함하고 최소 8자 이상이어야 합니다."
      );
      return;
    }

    try {
      // Firebase 인증 서비스를 사용하여 회원가입 처리
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("회원가입 성공:", user.email);

      const usersCollectionRef = collection(db, "users");
      await addDoc(usersCollectionRef, {
        uid: user.uid,
        email: user.email,
      });

      console.log("회원 정보 저장 완료");
      window.alert("회원가입이 성공적으로 완료되었습니다.");
      fetchUserData();
      navigate("/");
    } catch (error) {
      console.error("회원가입 실패:", error.message);
      window.alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }

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
                <input
                  placeholder="비밀번호 확인"
                  type="password"
                  value={confirmpassword}
                  onChange={handleConfirmPasswordChange}
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
                  type="button"
                  onChange={handleSignup}
                >
                  회원가입하기
                </button>
              </div>
              <div
                style={{
                  width: "360px",
                }}
              >
                <Link to="/Login">
                  <button
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
                    로그인하러 가기
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </Container>
      </>
    );
  };
}
