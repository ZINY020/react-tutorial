import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../common/Header";
import Container from "../../common/Container";
// 전체를 불러온다 * , S를 앞에 추가해서 사용하겠다.
import * as S from "./Main.styled";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../redux/modules/postSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Main() {
  const dispatch = useDispatch();
  // useNavigate 훅을 사용하여 라우터 이동을 위한 navigate 함수를 받아옵니다.
  const navigate = useNavigate();
  const auth = getAuth();
  const [isLoginedIn, setIsLoginedIn] = useState(false);

  // useState 훅을 사용하여 게시물 목록을 저장할 상태(posts)와 해당 상태를 업데이트하는 함수(setPosts)를 만듭니다.
  // 임시로 4개의 게시물 데이터를 배열로 만들어 초기값으로 설정합니다.

  // useSelector 사용
  const reduxPost = useSelector((state) => state.post);

  //클릭한 유저만 찾음
  const onlyUser = (id) => {
    const findPost = reduxPost.find((post) => post.id === id);
    return findPost.author === auth.currentUser?.email ? true : false;
  };

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 로그인 상태 감지
    // onAuthStateChanged는 유저 상태의 변화가 있을 때 실행되는 메소드
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoginedIn(true);
      } else {
        setIsLoginedIn(false);
      }
    });

    return () => unsubscribe(); // 컴포넌트가 언마운트될 때 이벤트 구독 해제
  }, [auth]);

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
          {isLoginedIn ? (
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
          ) : null}
        </div>
        {/* map을 사용하여 게시물 목록을 표시합니다. */}
        {/* key를 추가하여 오류를 방지합니다. map과 key는 세트 */}
        {reduxPost.map((post) => (
          <S.todoList key={post.id}>
            <li
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
            </li>
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
              {onlyUser(post.id) ? (
                <>
                  {" "}
                  <div>
                    {/* 수정 버튼을 클릭하면 해당 게시물 수정 페이지로 이동하도록 navigate 함수를 사용합니다. */}
                    <button
                      onClick={() => {
                        navigate(`/edit/${post.id}`); // 여기서 수정 페이지로 이동할 때 id를 함께 보냅니다.
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
                        dispatch(remove(post.id));
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
                </>
              ) : null}
            </div>
          </S.todoList>
        ))}
      </Container>
    </>
  );
}
