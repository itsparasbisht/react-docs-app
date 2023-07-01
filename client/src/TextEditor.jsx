import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useRef } from "react";
import { useEffect } from "react";

export default function TexEditor() {
  const containerRef = useRef();

  useEffect(() => {
    const editor = document.createElement("div");
    containerRef.current.append(editor);
    new Quill(editor, {
      theme: "snow",
    });

    return () => {
      containerRef.current = document.createElement("div");
    };
  }, []);

  return <div id="container" ref={containerRef}></div>;
}
