import Layout from "../components/global/Layout";
import PageContainer from "../components/global/PageContainer";
import React, { useState } from "react";
import Input from "../components/global/Input";
import Button from "../components/global/Button";
import { useThread } from "../src/hooks/useThread";
import Loading from "../components/global/Loading";

const Create = () => {
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;
  const { createLoading, createThread } = useThread();
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const submitHandler = async () => {
    await createThread(postTitle, content);
  };

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
        <ReactQuill
          modules={modules}
          onChange={(e: React.SetStateAction<string>) => {
            if (e === "<p><br></p>") {
              setContent("");
            } else {
              setContent(e);
            }
          }}
          style={{ marginTop: 20 }}
          theme="snow"
        />
        <Button
          onClick={submitHandler}
          normal={false}
          disabled={postTitle === "" || content === "" || createLoading}
          className={`mt-10 bg-primary w-full max-w-[100px] mx-auto ${
            content.length < 1 && "bg-content cursor-not-allowed"
          }`}
        >
          {createLoading ? <Loading size={15} /> : "Create"}
        </Button>
      </div>
    </PageContainer>
  );
};

export default Create;

Create.getLayout = (page: any) => <Layout>{page}</Layout>;
