import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Edit from "./pages/Edit";

function App() {
  // useState 훅을 사용하여 게시물 목록을 저장할 상태(posts)와 해당 상태를 업데이트하는 함수(setPosts)를 만듭니다.
  // 임시로 4개의 게시물 데이터를 배열로 만들어 초기값으로 설정합니다.
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "첫 번째 할 일",
      content: "이것을 해야합니다.",
      author: "디니땅",
    },
    {
      id: 2,
      title: "두 번째 할 일",
      content: "저것도 마무리해야합니다.",
      author: "디니땅땅",
    },
    {
      id: 3,
      title: "세 번째 할 일",
      content: "이것을 해야합니다.",
      author: "디니땅땅땅",
    },
    {
      id: 4,
      title: "네 번째 할 일",
      content: "저것을 마무리해야합니다.",
      author: "디니땅땅땅땅",
    },
  ]);
  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      <Route path="/" element={<Main posts={posts} setPosts={setPosts} />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
