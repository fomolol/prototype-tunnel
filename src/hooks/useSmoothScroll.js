/**
 * @file useSmoothScroll.js
 *
 * Note:
 *      You need to make sure that you've added
 *      selector passed below to the DOM
 */
import * as React from "react";
import Scrollbar from "smooth-scrollbar";

export const useSmoothScroll = (
  selector = "#scroll-content",
  damping = 0.06,
  thumbMinSize = 40
) => {
  React.useEffect(() => {
    const options = {
      damping,
      thumbMinSize,
    };
    Scrollbar.init(document.querySelector(selector), options);
  }, []);
};
