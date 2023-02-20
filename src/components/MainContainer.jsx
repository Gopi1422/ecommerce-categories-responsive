import React, { createRef, useEffect, useRef, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { motion } from "framer-motion";

import RowContainer from "./RowContainer";
import CartContainer from "./CartContainer";
import EndOfPage from "../img/endOfPage.svg";
import { useStateValue } from "../context/StateProvider";
import { products, categories } from "../utils/data";

const MainContainer = ({ headerRef }) => {
  const [{ cartShow }] = useStateValue();

  /* scroll to splecific section on button click using useref of react js */
  const categoryRefs = useRef([]);
  const sideMenuRef = useRef();
  const tempRef = useRef();
  const categoryMenuSmRef = useRef();
  const categoryItemRefs = useRef([]);

  const [visibleSection, setVisibleSection] = useState("category0");

  // Initialize category section and category menu item references
  useEffect(() => {
    categoryRefs.current = categories.map(
      (ref, index) => (categoryRefs.current[index] = createRef())
    );

    categoryItemRefs.current = categories.map(
      (ref, index) => (categoryItemRefs.current[index] = createRef())
    );
  }, []);

  // For Scroll Syncing (monitor section on the top of page)
  useEffect(() => {
    // get the main container
    const container = document.querySelector("main");

    // highlight the category menu item based on the category section on top of page
    const handleScroll = () => {
      let categoryMenuSmHeight = 0;

      // for small devides - get the height of the category menu
      if (window.innerWidth < 768) {
        const { height } = getDimensions(categoryMenuSmRef.current);
        categoryMenuSmHeight = height;
      }

      // get the header height
      const { height: headerHeight } = getDimensions(headerRef.current);

      // calculate scroll position
      const scrollPosition =
        container.scrollTop + headerHeight + 8 + categoryMenuSmHeight;

      // get the reference to the category section that is on top of page
      // eslint-disable-next-line array-callback-return
      const selected = categoryRefs.current.find((ref, index) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });

      // update the visible section state and auto scroll the category menu if item is not visible in the viewport
      if (selected && selected.current.id !== visibleSection) {
        setVisibleSection(selected.current.id);

        // check if category menu item is visible or not
        const selectedIndex = selected.current.id.split("category")[1];
        const isVisible = isInViewport(
          categoryItemRefs.current[selectedIndex].current
        );

        if (isVisible > -1) {
          // item is not visible in the viewport

          if (isVisible === 1) {
            // scroll to bottom by 250 pixels
            sideMenuRef.current.scrollBy(0, 250);
          } else if (isVisible === 0) {
            // scroll to top by 250 pixels
            sideMenuRef.current.scrollBy(0, -250);
          } else if (isVisible === 3) {
            // scroll to right by 250 pixels
            categoryMenuSmRef.current.scrollBy(250, 0);
          } else if (isVisible === 2) {
            // scroll to left by 250 pixels
            categoryMenuSmRef.current.scrollBy(-250, 0);
          }
        }
      }
    };

    // add event listener to monitor scrolling
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleSection]);

  // monitor the cartShow
  useEffect(() => {}, [cartShow]);

  /* 
  Function returns
    -1 if element is visible 
    0 if scroll to top is needed
    1 if scroll to bottom is needed
    2 if scroll to left is needed
    3 if scroll to right is needed
  */
  const isInViewport = (element) => {
    const { height: headerHeight } = getDimensions(headerRef.current);
    const rect = element.getBoundingClientRect();

    // For desktop and tablet devices -- vertical scrolling
    if (window.innerWidth >= 768) {
      if (rect.top >= headerHeight) {
        if (
          !(
            rect.bottom <
            (window.innerHeight || document.documentElement.clientHeight)
          )
        ) {
          return 1;
        }
      } else {
        return 0;
      }
    }
    // For mobile devices -- horizontal scrolling
    else {
      if (rect.left >= 0) {
        if (
          !(
            rect.right <
            (window.innerWidth || document.documentElement.clientWidth)
          )
        ) {
          return 3;
        }
      } else {
        return 2;
      }
    }

    // if no scrolling is needed (i.e. element is visible)
    return -1;
  };

  // Get different dimentions of element
  const getDimensions = (element) => {
    const { height } = element.getBoundingClientRect();
    const offsetTop = element.offsetTop;
    const offsetBottom = offsetTop + height;
    return {
      height,
      offsetTop,
      offsetBottom,
    };
  };

  return (
    <>
      {/* Category Item Menu Section for Mobile */}
      <menu
        ref={categoryMenuSmRef}
        id="category-menu-sm"
        className="flex items-center 
   py-2 pt-3 px-6 md:hidden gap-4 overflow-x-scroll scroll-smooth scrollbar-none"
      >
        {categories &&
          categories.map((category, index) => (
            <div
              ref={
                window.innerWidth < 768
                  ? categoryItemRefs.current[index]
                  : tempRef
              }
              id={`category-menu-item${index}`}
              className={`${
                visibleSection === "category".concat(index) ? " active" : ""
              } category-menu-item`}
              key={category?.id}
              onClick={() => {
                categoryRefs.current[index].current.scrollIntoView();
              }}
            >
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="item-image-container group min-w-[48px] min-h-[48px] sm:min-w-[70px] sm:min-h-[70px] w-12 h-12 bg-lightGray cursor-pointer rounded-md flex gap-3 items-center justify-center"
              >
                <img
                  src={category?.image}
                  className="item-image w-6 h-6 sm:w-8 sm:h-8"
                  alt="Icon"
                />
              </motion.div>
              <div className="w-13 my-2 min-h-[32px] sm:min-h-[40px] flex flex-wrap justify-center">
                <p className="item-name line-clamp-2 text-categoryNeutralGray font-medium text-[11px] sm:text-sm">
                  {category?.name}
                </p>
              </div>
            </div>
          ))}
      </menu>

      <section className="flex flex-1 overflow-hidden">
        {/* Category Item Menu Section for Desktop & Tablet */}
        <aside
          className="hidden md:block min-w-[18%] lg:min-w-[21%] overflow-y-scroll py-2 pb-7 px-4 scroll-smooth scrollbar-custom"
          id="sidemenu"
          ref={sideMenuRef}
        >
          <ul className="gap-2">
            {categories &&
              categories.map((category, index) => (
                <li
                  id={`category-item${index}`}
                  key={category.id}
                  className={`category-item`}
                  ref={
                    window.innerWidth < 768
                      ? tempRef
                      : categoryItemRefs.current[index]
                  }
                  // onClick={handleScroll}
                  onClick={() => {
                    categoryRefs.current[index].current.scrollIntoView();
                  }}
                >
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    className={`${
                      visibleSection === "category".concat(index)
                        ? " active"
                        : ""
                    } text-neutralGray hover:bg-gray-100 font-semibold text-base flex items-center gap-x-4 cursor-pointer p-2 px-3 rounded-md mt-2`}
                  >
                    {category.name}
                  </motion.div>
                </li>
              ))}
          </ul>
        </aside>
        {/* Main Section  */}
        <main
          className="flex flex-1 flex-col overflow-y-auto sm:p-5 sm:pt-2 sm:pr-1 p-4 pt-0 scroll-smooth"
          id="main-container"
        >
          {/* <div className="w-full flex flex-1 flex-col items-center"> */}
          {/* Category Section */}
          {categories &&
            categories.map((category, index) => (
              <div
                id={`category${index}`}
                ref={categoryRefs.current[index]}
                className="w-full pt-1 sm:pt-3 sm:pb-1"
                key={category?.id}
              >
                <div className="w-full flex items-center justify-between">
                  <p className="text-[large] sm:text-2xl text-headingColor font-bold capitalize relative">
                    {category?.name}
                  </p>
                  <MdChevronRight className="text-2xl  mr-auto ml-1"></MdChevronRight>
                </div>
                <RowContainer data={products} />
                <hr className="w-full h-0 sm:h-[0.15rem] bg-gray-100 border-0 rounded mb-4 sm:mt-4 sm:mb-3"></hr>
              </div>
            ))}

          <div className="w-full flex flex-col items-center justify-center gap-6 p-3">
            <img src={EndOfPage} className="w-300" alt="No Items" />
            <p className="text-xl text-textColor font-semibold mb-5">
              End of Categories
            </p>
          </div>

          {/* Cart Container */}
          {cartShow && <CartContainer />}
          {/* </div> */}
        </main>
      </section>
    </>
  );
};

export default MainContainer;
