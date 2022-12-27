import Layout from "../components/global/Layout";
import PageContainer from "../components/global/PageContainer";
import React, { useState, useRef, ChangeEvent } from "react";
import Input from "../components/global/Input";
import Button from "../components/global/Button";
import TextEditor from "../components/pages/createPost/TextEditor";
import ContentEditable from "react-contenteditable";

const Create = () => {
  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
  });
  const [activeMarkdown, setActiveMarkdown] = useState<string[]>([]);
  const contentEditableRef = useRef<any>(null);
  const inputHandler = (e: ChangeEvent<any>) => {
    setPostInfo({
      ...postInfo,
      [e.target.name || "content"]: e.target.value,
    });
  };

  // TODO when clicking on content activate relevant tabs in editor
  const textFocusHandler = (e: any) => {};

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
          onChange={(e) => inputHandler(e)}
          value={postInfo.title}
        />
        <TextEditor
          activeMarkdown={activeMarkdown}
          setActiveMarkdown={setActiveMarkdown}
        />
        <ContentEditable
          placeholder="What are your thoughts?"
          ref={contentEditableRef}
          html={postInfo.content}
          tagName="pre"
          onFocus={(e) => textFocusHandler(e)}
          onBlur={() => {
            setActiveMarkdown([]);
          }}
          onChange={inputHandler}
          className="text-[14px] whitespace-pre-wrap w-full bg-darkContent text-white resize-none
          transition-all duration-200 border border-zinc-800 w-full
          h-80 focus:outline-0 focus:border-primary p-5 rounded-br rounded-bl"
        />
        <Button
          normal={false}
          disabled={true}
          className={`mt-10 bg-primary w-full max-w-[100px] mx-auto ${
            postInfo.content.length < 1 && "bg-content cursor-not-allowed"
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
