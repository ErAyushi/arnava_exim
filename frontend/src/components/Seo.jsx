import { useEffect } from "react";

export default function Seo({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", description);
      let og = document.querySelector('meta[property="og:title"]');
      if (og && title) og.setAttribute("content", title);
    }
  }, [title, description]);
  return null;
}
