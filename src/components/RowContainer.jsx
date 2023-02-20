import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ data }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [items, setItems] = useState(cartItems);
  const [addToCart, setAddToCart] = useState([]);

  // Update cart items in the context provider as well as localstorage
  const addItemToCartDispatch = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  // Update the cart items based on the toggle button state
  const updateCart = (item, index) => {
    // Add item to cart
    if (addToCart[index]) {
      item.qty = 1;
      setItems([...cartItems, item]);
      setAddToCart((datas) => ({
        ...datas,
        [index]: false,
      }));
    }
    // Remove item from cart
    else {
      setItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
      setAddToCart((datas) => ({
        ...datas,
        [index]: true,
      }));
    }
  };

  // Update toggle button state based on the cart items
  const updateToggleButton = () => {
    const cartItemIds = cartItems.map((cartItem) => cartItem.id);
    data.forEach((item, index) => {
      cartItemIds.includes(item.id)
        ? setAddToCart((datas) => ({
            ...datas,
            [index]: false,
          }))
        : setAddToCart((datas) => ({
            ...datas,
            [index]: true,
          }));
    });
  };

  // monitor the cartShow
  useEffect(() => {
    updateToggleButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  // Update the cart items in the context provider and local storage
  useEffect(() => {
    addItemToCartDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className="w-full flex items-center gap-3 sm:gap-4  overflow-x-scroll scrollbar-none scroll-smooth">
      {/* category product card */}
      {data &&
        data.map((item, index) => (
          <div
            key={item?.id}
            className="w-118 min-w-[118px] sm:w-140 sm:min-w-[140px] h-auto sm:my-1 backdrop-blur-0  rounded-md p-2 hover:shadow-md"
          >
            {/* product image */}
            <div className="w-full flex items-center justify-between">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={item?.image}
                alt="p1.png"
                className="w-full h-118 sm:h-[122px]"
              />
              {/* toggle button */}
              <motion.div
                whileTap={{ scale: 0.75 }}
                onClick={() => updateCart(item, index)}
                className="absolute w-10 h-10 bottom-[5.75rem] sm:bottom-28 right-2 rounded-full bg-cartBtnBg flex items-center justify-center cursor-pointer hover:shadow-md "
              >
                <p className="text-2xl font-semibold  text-white">
                  {addToCart[index] ? "+" : "-"}
                </p>
              </motion.div>
            </div>
            {/* product details */}
            <div className="w-full flex flex-wrap flex-col items-start justify-start mt-2">
              <p className="text-textColor font-semibold text-base leading-6 sm:leading-8">
                {item?.price}
              </p>
              <div className="w-full flex flex-wrap">
                <p className="truncate hover:text-clip text-textColor font-semibold text-sm sm:leading-7">
                  {item?.name}
                </p>
              </div>
              <p className="text-gray-500 font-semibold text-[0.70rem] sm:leading-7">
                {item?.calories}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RowContainer;
