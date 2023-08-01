import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../modules/postSlice";

// 2. configureStore에서 {} 넣고, 그 안에 reducer: {} 이렇게 넣고
// 3. 변수를 만들어서 담는다.
const store = configureStore({
  reducer: { post: postSlice },
});

export default store;
