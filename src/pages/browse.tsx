import React, { useEffect } from "react";
import ContentTabs from "../components/pages/browse/ContentTabs";
import Post from "../components/pages/browse/Post";
import Layout from "../components/global/Layout";
import PageContainer from "../components/global/PageContainer";
import { useQuery } from "react-query";
import { getThreadsService } from "../services/threads";
import toast from "react-hot-toast";
import Loading from "../components/global/Loading";
import { useUser } from "../contexts/User";
import { IThread } from "../services/threads/types";
import { useVisibleElement } from "../hooks/useVisibleElement";

const Browse = () => {
    const { user } = useUser();
    const [isVisible, elementRef] = useVisibleElement();
    const { data, isLoading, isFetching } = useQuery(
        "threads",
        async () => {
            return await getThreadsService(user?.id).catch(() => {
                toast.error("Error fetching posts");
            });
        },
        {
            refetchOnWindowFocus: false,
            retry: 0,
        }
    );
    const [threads, setThreads] = React.useState<IThread[]>([]);
    useEffect(() => {
        if (data) {
            setThreads(data);
        }
    }, [data]);

    console.log(isVisible);

    return (
        <PageContainer pageTitle="Browse Metadit">
            <ContentTabs />
            <div className="flex flex-col gap-5 relative">
                {isLoading || isFetching ? (
                    <div className="mt-32">
                        <Loading size={30} />
                    </div>
                ) : (
                    threads?.map((post: IThread, index: number) => {
                        if (threads.length === index + 1) {
                            return (
                                <Post
                                    lastElement={elementRef}
                                    threads={threads}
                                    setThreads={setThreads}
                                    data={post}
                                    key={post.threadid}
                                />
                            );
                        } else {
                            return (
                                <Post
                                    threads={threads}
                                    setThreads={setThreads}
                                    data={post}
                                    key={post.threadid}
                                />
                            );
                        }
                    })
                )}
            </div>
        </PageContainer>
    );
};

export default Browse;

Browse.getLayout = (page: any) => <Layout>{page}</Layout>;
