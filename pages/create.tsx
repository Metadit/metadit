import Layout from "../components/global/Layout";
import PageContainer from "../components/global/PageContainer";
import React, { useState, ChangeEvent, useEffect } from "react";
import Input from "../components/global/Input";
import Button from "../components/global/Button";
import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const Create = () => {
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  useEffect(() => {
    if (content === "<p><br></p>") {
      setContent("");
    }
  }, [content]);

  return (
    <PageContainer pageTitle="Create Post">
      <h1 className="text-white text-[30px] font-bold">Create post</h1>
      <div
        className="mt-10 border border-zinc-800 bg-contentBg
      rounded-xl h-auto px-10 py-10"
      >
        <Input
          className="h-12 px-5"
          type="text"
          name="title"
          placeholder={"Title"}
          onChange={(e) => setPostTitle(e.target.value)}
          value={postTitle}
        />
        <QuillNoSSRWrapper
          modules={modules}
          onChange={setContent}
          style={{ marginTop: 20 }}
          theme="snow"
        />
        <Button
          normal={false}
          disabled={true}
          className={`mt-10 bg-primary w-full max-w-[100px] mx-auto ${
            content.length < 1 && "bg-content cursor-not-allowed"
          }`}
        >
          Create
        </Button>
      </div>
    </PageContainer>
  );
};

export default Create;

Create.getLayout = (page: any) => <Layout>{page}</Layout>;
