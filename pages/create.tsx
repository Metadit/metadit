import Layout from "../components/global/Layout";
import PageContainer from "../components/global/PageContainer";
import React, { useEffect } from "react";
import Input from "../components/global/Input";
import Button from "../components/global/Button";
import TextEditor from "../components/pages/createPost/TextEditor";

const Create = () => {
  const [postInfo, setPostInfo] = React.useState({
    title: "",
    content: "",
  });
  const [activeMarkdown, setActiveMarkdown] = React.useState<any>([]);
  const inputHandler = (e: React.ChangeEvent<any>) => {
    setPostInfo({
      ...postInfo,
      [e.target.name || "content"]:
        e.target.value || e.currentTarget.textContent,
    });
  };
  return (
    <PageContainer>
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
        <TextEditor setActiveMarkdown={setActiveMarkdown} />
        <div
          placeholder="What are your thoughts?"
          contentEditable={true}
          onInput={(e) => inputHandler(e)}
          className="text-[14px] bg-darkContent text-white resize-none
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
