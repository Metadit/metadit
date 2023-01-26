import React, { useEffect, useState } from "react";
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
import { NextPageContext } from "next";

const Browse = ({ tabParams }: { tabParams: string }) => {
    const { user } = useUser();
    const { isLoading, isFetching, refetch, isRefetching } = useQuery(
        "threads",
        async () => {
            return await getThreadsService(user?.id, tabParams).catch(() => {
                toast.error("Error fetching posts");
            });
        },
        {
            refetchOnWindowFocus: false,
            retry: 0,
        }
    );
    const [threads, setThreads] = useState<IThread[] | null>(null);

    useEffect(() => {
        (async () => {
            const { data } = await refetch();
            setThreads(data as IThread[]);
        })();
    }, [refetch, tabParams]);

    return (
        <PageContainer pageTitle="Browse Metadit">
            <ContentTabs />
            <div className="flex flex-col gap-5 relative">
                {isLoading || isFetching || isRefetching ? (
                    <div className="mt-32">
                        <Loading size={30} />
                    </div>
                ) : (
                    threads?.map((post: IThread, index: number) => {
                        if (threads.length === index + 1) {
                            return (
                                <Post
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

export const getServerSideProps = ({ query }: NextPageContext) => {
    return {
        props: {
            tabParams: query.tab,
        },
    };
};

Browse.getLayout = (page: any) => <Layout>{page}</Layout>;
