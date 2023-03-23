import Layout from "../components/global/Layout";
import PageContainer from "../components/global/PageContainer";
import React, { ReactNode, useMemo, useState } from "react";
import Input from "../components/global/Input";
import Button from "../components/global/Button";
import { useThread } from "../hooks/useThread";
import { useRouter } from "next/router";
import { supabase } from "../supabase";
import dynamic from "next/dynamic";
import short from "short-uuid";

const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill");
        // eslint-disable-next-line react/display-name
        return ({ forwardedRef, ...props }: any) => (
            <RQ ref={forwardedRef} {...props} />
        );
    },
    { ssr: false }
);

const Create = () => {
    const { createLoading, createThread } = useThread();
    const router = useRouter();
    const quillRef = React.useRef<any>(null);
    const [postTitle, setPostTitle] = useState("");
    const [content, setContent] = useState("");
    const [fileImageUrls, setFileImageUrls] = useState<
        { fileName: string; fileUrl: string }[]
    >([]);
    const modules = useMemo(() => {
        const handleImageUpload = async () => {
            const id = short.generate();
            const editor = quillRef.current.getEditor();
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();
            input.onchange = async () => {
                const file = input.files ? input.files[0] : null;
                if (file && /^image\//.test(file.type)) {
                    const fileExt = file.name.split(".").pop();
                    await supabase.storage
                        .from("threads")
                        .upload(`${id}.${fileExt}`, file);
                    const { data } = supabase.storage
                        .from("threads")
                        .getPublicUrl(`${id}.${fileExt}`);
                    editor.insertEmbed(
                        editor.getSelection(),
                        "image",
                        data.publicUrl
                    );
                    setFileImageUrls(prev => [
                        ...prev,
                        {
                            fileName: id,
                            fileUrl: data.publicUrl,
                        },
                    ]);
                }
            };
        };
        return {
            toolbar: {
                container: [
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                ],
                handlers: {
                    image: async (value: boolean) => {
                        if (value) {
                            await handleImageUpload();
                        }
                    },
                },
            },
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            },
        };
    }, []);

    const submitHandler = async () => {
        const threadId = await createThread(postTitle, content, fileImageUrls);
        await router.push(`/post/${threadId}`);
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
                    onChange={e => setPostTitle(e.target.value)}
                    value={postTitle}
                />
                <ReactQuill
                    forwardedRef={quillRef}
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
                    loading={createLoading}
                    disabled={
                        postTitle === "" || content === "" || createLoading
                    }
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

Create.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;
