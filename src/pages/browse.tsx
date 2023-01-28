import React, { useCallback, useEffect, useState } from "react";
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
import { useVisibleElement } from "../hooks/useVisibleElement";

const Browse = ({ tabParams }: { tabParams: string }) => {
    const { user } = useUser();
    const [offset, setOffset] = useState(0);
    const [loadMore, setLoadMore] = useState(true);
    const [newTabLoading, setNewTabLoading] = useState(false);
    const { isVisible, elementRef: lastPostRef } = useVisibleElement();
    const [threads, setThreads] = useState<IThread[] | null>(null);
    const [tab, setTab] = useState<string>(tabParams);

    const { isLoading, isFetching, refetch, isRefetching } = useQuery(
        "threads",
        async () => {
            return await getThreadsService(user?.id, tab, offset, 10).catch(
                () => {
                    toast.error("Error fetching posts");
                }
            );
        },
        {
            onSuccess: (data: IThread[]) => {
                setThreads(prev => [...(prev || []), ...data]);
                setOffset(prev => prev + 10);
                if (data.length < 10 && data.length > 0) {
                    setLoadMore(false);
                    setOffset(0);
                }
            },
            refetchOnWindowFocus: false,
            retry: 0,
        }
    );

    const tabRefetchHandler = useCallback(async () => {
        setThreads(null);
        setNewTabLoading(true);
        await refetch();
        setNewTabLoading(false);
    }, [refetch]);

    useEffect(() => {
        if (isVisible && loadMore) {
            refetch();
        }
    }, [isVisible, loadMore, refetch]);

    useEffect(() => {
        if (offset === 0) {
            tabRefetchHandler();
        }
    }, [offset, tabRefetchHandler, tab]);

    return (
        <PageContainer pageTitle="Browse Metadit">
            <ContentTabs
                setTab={(arg: string) => setTab(arg)}
                setOffset={(arg: number) => setOffset(arg)}
            />
            <div className="flex flex-col gap-5 relative">
                {isLoading || (isFetching && !isRefetching) || newTabLoading ? (
                    <div className="mt-32">
                        <Loading size={30} />
                    </div>
                ) : (
                    threads?.map((post: IThread, index: number) => {
                        if (threads.length === index + 1) {
                            return (
                                <Post
                                    ref={lastPostRef}
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
