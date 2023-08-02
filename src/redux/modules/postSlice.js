import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const initialState = [
  {
    id: uuid(),
    title: "첫 번째 할 일",
    content: "이것을 해야합니다.",
    author: "디니땅",
  },
  {
    id: uuid(),
    title: "두 번째 할 일",
    content: "저것도 마무리해야합니다.",
    author: "디니땅땅",
  },
  {
    id: uuid(),
    title: "세 번째 할 일",
    content: "이것을 해야합니다.",
    author: "디니땅땅땅",
  },
  {
    id: uuid(),
    title: "네 번째 할 일",
    content: "저것을 마무리해야합니다.",
    author: "디니땅땅땅땅",
  },
];

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // post Add를 만든다 객체 형태
    add(state, action) {
      return [...state, action.payload];
    },

    // post remove를 만든다.
    remove(state, action) {
      return state.filter((post) => post.id !== action.payload);
    },

    // 1. 전체 post 데이터를 가져와서
    // 2. 내가 수정하려고 하는 post를 찾는다
    // 3. 해당 post를 수정한다

    // 수정기능
    edit(state, action) {
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        } else {
          return post;
        }
      });
    },
  },
});

export default postSlice.reducer;
export const { add, remove, edit } = postSlice.actions;
