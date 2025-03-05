import { Children, createContext, useState } from "react";

export const CartListData = createContext({
  cartList: [],
  addToCart: () => {},
  deleteFromCart: () => {},
});

const deleteFromCart= () => {}
const CartListPrvoider = ({ children }) => {
  let [cartList, setCartList] = useState([]);
  function addToCart(product) {
    const newCart = [...cartList, product];
    setCartList(newCart);
  }
  return(

    <CartListData.Provider value={{ cartList, addToCart, deleteFromCart }}>
      {children}
    </CartListData.Provider>
    )
};
export default CartListPrvoider;
