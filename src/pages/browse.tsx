import React, { useCallback, useEffect, useState } from "react";
import ContentTabs from "../components/pages/browse/ContentTabs";
import Post from "../components/pages/browse/Post";
import Layout from "../components/global/Layout";
import PageContainer from "../components/global/PageContainer";
import { useInfiniteQuery } from "react-query";
import { getThreadsService } from "../services/threads";
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

    const {
        isLoading,
        isFetching,
        refetch,
        fetchNextPage,
        isRefetching,
        data,
    } = useInfiniteQuery(
        "threads",
        async ({ pageParam = offset }) => {
            return await getThreadsService(user?.id, tab, pageParam, 10);
        },
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.length < 10) {
                    return undefined;
                } else {
                    if (pages.length === 1) {
                        return 10;
                    }
                    return pages.length * 10;
                }
            },
        }
    );

    const tabHandler = useCallback(async () => {
        if (newTabLoading && tab !== tabParams) {
            setOffset(0);
            await refetch();
            setNewTabLoading(false);
        }
    }, [newTabLoading, refetch, tab, tabParams]);

    useEffect(() => {
        if (isVisible && loadMore) {
            fetchNextPage();
        }
    }, [isVisible, loadMore, fetchNextPage]);

    useEffect(() => {
        tabHandler();
    }, [tabHandler, tab]);

    return (
        <PageContainer pageTitle="Browse Metadit">
            <ContentTabs
                setTab={(arg: string) => setTab(arg)}
                setNewTabLoading={setNewTabLoading}
            />
            <div className="flex flex-col gap-5 relative">
                {isLoading || (isFetching && !isRefetching) || newTabLoading ? (
                    <div className="mt-32">
                        <Loading size={30} />
                    </div>
                ) : (
                    data?.pages.map(page => {
                        return page.map((post: IThread, index: number) => {
                            if (page.length === index + 1) {
                                return (
                                    <Post
                                        ref={lastPostRef}
                                        threads={page}
                                        setThreads={setThreads}
                                        data={post}
                                        key={post.threadid}
                                    />
                                );
                            } else {
                                return (
                                    <Post
                                        threads={page}
                                        setThreads={setThreads}
                                        data={post}
                                        key={post.threadid}
                                    />
                                );
                            }
                        });
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
