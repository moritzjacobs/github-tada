import { CLASS_BUTTON, CLASS_REACTION, CLASS_WRAPPER } from "./constants";

// safely remove a DOM node
export const removeElement = (element: Node) => {
  element && element.parentNode && element.parentNode.removeChild(element);
};

// remove old self before creating a new one
export const purgeAndRecreate = () => {
  removeElement(document.getElementById(CLASS_WRAPPER));

  // DOM cache
  const el = document.createElement("nav");

  el.classList.add(CLASS_WRAPPER);
  el.id = CLASS_WRAPPER;

  return el;
};
