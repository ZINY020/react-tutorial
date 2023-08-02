import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../modules/postSlice";
import userSlice from "../modules/userSlice";

// 2. configureStore에서 {} 넣고, 그 안에 reducer: {} 이렇게 넣고
// 3. 변수를 만들어서 담는다.
const store = configureStore({
  reducer: { post: postSlice, user: userSlice },
});

export default store;
