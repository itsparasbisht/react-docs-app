import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useRef } from "react";
import { useEffect } from "react";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: {} }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function TexEditor() {
  const containerRef = useRef();

  useEffect(() => {
    const editor = document.createElement("div");
    containerRef.current.append(editor);
    new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
    });

    return () => {
      containerRef.current = document.createElement("div");
    };
  }, []);

  return <div className="container" ref={containerRef}></div>;
}
