import { fetchCart } from "../utils/fetchLocalStorageData";

const cartInfo = fetchCart();

export const initialState = {
  cartShow: false,
  cartItems: cartInfo,
};
