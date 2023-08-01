import React, { Fragment, useState, useEffect } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { edit } from "../redux/modules/postSlice";

export default function Edit({}) {
  // useParams를 사용해서 URL에 있는 post의 Id값을 가져옵니다.
  // find, fliter를 이용해 posts에 있는 요소 중 ID값이 동일한 객체를 찾아냅니다.

  const { id } = useParams();

  const reduxPost = useSelector((state) => state.post);
  const dispatch = useDispatch();

  // find를 이용해 props로 내려받은 posts의 값에 접근합니다. post의 id값과 useparams를 이용해 찾은 id값이 동일한 요소를 찾습니다.
  const findPost = reduxPost.find((post) => post.id === id);

  const navigate = useNavigate();

  // title, content를 state로 관리해서 값을 변경해주는건 어떨까요?
  const [title, setTitle] = useState(findPost?.title || "");
  const [content, setContent] = useState(findPost?.content || "");

  // editHandler
  // input값에 데이터가 들어올 때 title과 content에 값을 변경(?)해주는 코드

  const editPost = {
    id: findPost.id,
    title,
    content,
    author: "뭐얌",
  };

  return (
    <Fragment>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            // submit 이벤트가 발생할 때 post의 수정사항이 반영된다.
            dispatch(edit(editPost));
            // 수정 완료시 navigate를 통해 메인페이지로 이동
            navigate("/");
            console.log("제출!");
          }}
        >
          <div>
            <input
              placeholder="제목"
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              placeholder="내용"
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
          <button
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "orange",
              cursor: "pointer",
            }}
          >
            수정하기
          </button>
        </form>
      </Container>
    </Fragment>
  );
}
