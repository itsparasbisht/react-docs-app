import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

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
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const containerRef = useRef();

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == undefined || quill == undefined) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      console.log("opop");
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", () => {
      console.log("hello");
    });

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    const editor = document.createElement("div");
    containerRef.current.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
    });
    setQuill(q);

    return () => {
      containerRef.current = document.createElement("div");
    };
  }, []);

  return <div className="container" ref={containerRef}></div>;
}
