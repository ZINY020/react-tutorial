import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";

export default function Main({ posts, setPosts }) {
  // useNavigate 훅을 사용하여 라우터 이동을 위한 navigate 함수를 받아옵니다.
  const navigate = useNavigate();

  // useState 훅을 사용하여 게시물 목록을 저장할 상태(posts)와 해당 상태를 업데이트하는 함수(setPosts)를 만듭니다.
  // 임시로 4개의 게시물 데이터를 배열로 만들어 초기값으로 설정합니다.

  // 게시물 삭제 함수
  const handleDeletePost = (postId) => {
    // setPosts를 사용하여 해당 postId에 해당하는 게시물을 삭제합니다.
    // filter 함수를 사용하여 삭제하지 않을 게시물만 남기도록 합니다.
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <>
      {/* Header 컴포넌트를 통해 상단 헤더를 표시합니다. */}
      <Header />
      {/* Container 컴포넌트를 통해 내용을 감싸고 중앙 정렬 및 최대 너비를 지정합니다. */}
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "12px",
          }}
        >
          {/* 추가 버튼을 클릭하면 /create 페이지로 이동하도록 navigate 함수를 사용합니다. */}
          <button
            onClick={() => {
              navigate("/create");
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "skyblue",
              color: "white",
              cursor: "pointer",
            }}
          >
            추가
          </button>
        </div>
        {/* map을 사용하여 게시물 목록을 표시합니다. */}
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: "#EEEEEE",
              height: "100px",
              borderRadius: "24px",
              marginBottom: "12px",
              display: "flex",
              padding: "12px 16px 12px 16px",
            }}
          >
            <div
              onClick={() => {
                // 게시물 제목을 클릭하면 해당 게시물 상세 페이지로 이동하도록 navigate 함수를 사용합니다.
                navigate(`/detail/${post.id}`);
              }}
              style={{
                flex: 4,
                borderRight: "1px solid lightgrey",
                cursor: "pointer",
              }}
            >
              {/* 게시물 제목을 표시합니다. */}
              <h2>{post.title}</h2>
              <p
                style={{
                  width: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {/* 게시물 내용을 표시합니다. */}
                {post.content}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                justifyContent: "space-around",
                gap: "12px",
              }}
            >
              <div>{post.author}</div>
              <div>
                {/* 수정 버튼을 클릭하면 해당 게시물 수정 페이지로 이동하도록 navigate 함수를 사용합니다. */}
                <button
                  onClick={() => {
                    navigate(`/Detail/${post.id}`); // 여기서 수정 페이지로 이동할 때 id를 함께 보냅니다.
                  }}
                  style={{
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    backgroundColor: "orange",
                    color: "white",
                    cursor: "pointer",
                    marginRight: "6px",
                  }}
                >
                  수정
                </button>
                {/* 삭제 버튼을 클릭하면 해당 게시물을 삭제하는 handleDeletePost 함수를 호출합니다. */}
                <button
                  onClick={() => {
                    handleDeletePost(post.id);
                  }}
                  style={{
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
