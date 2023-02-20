import React, { useEffect, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CartItem = ({ item, flag, setFlag }) => {
  const [qty, setQty] = useState(item.qty);
  const [{ cartItems }, dispatch] = useStateValue();
  const [items, setItems] = useState(cartItems);

  // Update the cart items with updated quantity values in the context provider and local storage
  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };

  // Update the cart items quantity values
  const updateQty = (action, id) => {
    // increase item quantity
    if (action === "add") {
      setQty(qty + 1);
      const updatedItems = items.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
        return item;
      });
      setItems(updatedItems);
    }
    // decrease item quantity
    else {
      // remove item if the quantity was 1
      if (qty === 1) {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setItems(updatedItems);
        setFlag(flag - 1);
      }
      // decrease quantity
      else {
        setQty(qty - 1);
        const updatedItems = items.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag - 1);
          }
          return item;
        });
        setItems(updatedItems);
      }
    }
  };

  // Update cart items in context provider and local storage
  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  // Update items quantity on quantity change
  useEffect(() => {
    // items = cartItems;
    cartDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, items]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      {/* product image section */}
      <img
        src={item?.image}
        className="w-20 h-20 max-w-[80px] rounded-full objectt-contain"
        alt="p1"
      />
      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.name}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          {item?.price[0] +
            " " +
            (parseFloat(item?.price.slice(1)) * qty).toFixed(2)}
        </p>
      </div>

      {/* quantity button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        {/* add quantity button */}
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
        {/* product quantity */}
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>
        {/* decrease quantity button */}
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
