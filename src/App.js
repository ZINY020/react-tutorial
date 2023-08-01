import { Routes, Route } from "react-router-dom";
import React from "react";
import Main from "./pages/main/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Edit from "./pages/Edit";

function App() {
  // useState 훅을 사용하여 게시물 목록을 저장할 상태(posts)와 해당 상태를 업데이트하는 함수(setPosts)를 만듭니다.
  // 임시로 4개의 게시물 데이터를 배열로 만들어 초기값으로 설정합니다.
  // uuid는 중복 문제를 효과적으로 방지하기

  // 수정, 상세페이지 삭제, id에 따른 수정/삭제

  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      <Route path="/" element={<Main />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/create" element={<Create />} />
      {/* 저희는 천재입니다. edit/:id값을 추가해서 Edit 페이지를 연결한다. */}
      {/* 수정, 클릭한 post의 내용을 출력하기위해 post와 setPost를 props로 내려줍니다. */}
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
