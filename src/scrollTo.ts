import { CLASS_HIGHLIGHT } from "./constants";
import { Comment } from "./comments";

// Click handler: scroll into view
const scrollTo = (targetCommentEl: HTMLElement): void => {
  targetCommentEl.scrollIntoView({ behavior: "smooth", block: "center" });

  // remove highlight from any other comment ...
  const highlighted = document.querySelectorAll(CLASS_HIGHLIGHT);
  for (const item of highlighted) {
    item.classList.remove(CLASS_HIGHLIGHT);
  }

  // and add highlight to this comment
  targetCommentEl.classList.add(CLASS_HIGHLIGHT);
};

export default scrollTo;
