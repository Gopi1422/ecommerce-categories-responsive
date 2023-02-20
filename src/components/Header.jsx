import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = ({ headerRef }) => {
  const [{ cartShow, cartItems }, dispatch] = useStateValue();

  // Update the cart visibility in the state context provider
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header
      ref={headerRef}
      className="flex items-center 
   bg-headerBg p-5 px-6 sm:p-6 sm:px-8"
    >
      {/* desktop & tablet */}
      <div className="hidden  md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <p className="text-headingColor text-2xl  font-bold">E-Commerce</p>
        </Link>
        <motion.button
          whileTap={{ scale: 0.6 }}
          onClick={showCart}
          className="relative flex items-center justify-center gap-2 rounded-full  bg-white p-2 px-5 cursor-pointer"
        >
          <MdShoppingCart className="text-textColor text-xl" />
          {cartItems && cartItems.length > 0 && (
            <p className="text-sm text-textColor font-semibold">
              {cartItems.length}
            </p>
          )}
        </motion.button>
      </div>

      {/* mobile */}
      <div className="flex md:hidden w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <motion.p
            whileTap={{ scale: 0.6 }}
            className="text-headingColor text-2xl font-bold"
          >
            E-Commerce
          </motion.p>
        </Link>
        <motion.button
          whileTap={{ scale: 0.6 }}
          onClick={showCart}
          className="relative flex items-center justify-center gap-2 rounded-full  bg-white p-2 px-5 cursor-pointer"
        >
          <MdShoppingCart className="text-textColor text-xl" />
          {cartItems && cartItems.length > 0 && (
            <p className="text-sm text-textColor font-semibold">
              {cartItems.length}
            </p>
          )}
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
