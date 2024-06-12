import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

interface RichEditorProps {
  placeholder: string;
  onChange: (value: string) => void;
  value: string | undefined;
}

const RichEditor = ({ placeholder, onChange, value }: RichEditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );

  return (
    <ReactQuill
      theme="snow"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default RichEditor;
