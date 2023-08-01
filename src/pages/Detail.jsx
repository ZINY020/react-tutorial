import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../redux/modules/postSlice";

export default function Detail({}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const reduxPost = useSelector((state) => state.post);
  const dispatch = useDispatch();

  // find를 이용해 props로 내려받은 posts의 값에 접근합니다. post의 id값과 useparams를 이용해 찾은 id값이 동일한 요소를 찾습니다.
  const findPost = reduxPost.find((post) => post.id === id);

  return (
    <>
      <Header />
      <Container>
        <h1
          style={{
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {findPost?.title}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {findPost?.content}
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            onClick={() => {
              navigate(`/edit/${id}`);
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
          <button
            onClick={() => {
              dispatch(remove(findPost.id));

              navigate("/");
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
      </Container>
    </>
  );
}
