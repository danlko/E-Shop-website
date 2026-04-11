import { createStore } from "redux";
import { cartReducer } from "./reducers";

export const store = createStore(cartReducer);
