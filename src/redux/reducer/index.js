import { combineReducers } from "redux";
import { myTemplateReducer } from "./MyTemplateReducer";
import { userReducer } from "./UserReducer";

const reducer = combineReducers({
  myTemplate: myTemplateReducer,
  user: userReducer,
});

export default reducer;
