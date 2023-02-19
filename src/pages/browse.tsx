import React, { useEffect, useState } from "react";
import ContentTabs from "../components/pages/browse/ContentTabs";
import Post from "../components/pages/browse/Post";
import Layout from "../components/global/Layout";
import PageContainer from "../components/global/PageContainer";
import Loading from "../components/global/Loading";
import { useUser } from "../contexts/User";
import { IThread } from "../services/threads/types";
import { NextPageContext } from "next";
import { useVisibleElement } from "../hooks/useVisibleElement";
import { useInfiniteQuery } from "react-query";
import { getThreadsService } from "../services/threads";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

const Browse = ({ tabParams }: { tabParams: string }) => {
    const { user } = useUser();
    const { isVisible, elementRef: lastPostRef } = useVisibleElement();
    const [tab, setTab] = useState<string>(tabParams.toLowerCase());
    const [scrollToTop, setScrollToTop] = useState<boolean>(false);

    const scrollTopHandler = () => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setScrollToTop(true);
            } else {
                setScrollToTop(false);
            }
        });
    };

    const {
        isLoading,
        isFetching,
        isRefetching,
        hasNextPage,
        data,
        fetchNextPage,
    } = useInfiniteQuery(
        ["threads"],
        async ({ pageParam = 0 }) => {
            return await getThreadsService(user?.id, tab, pageParam, 10);
        },
        {
            cacheTime: 0,
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.length === 0) {
                    return undefined;
                } else {
                    return pages.length * 10;
                }
            },
            refetchOnWindowFocus: false,
        }
    );

    useEffect(() => {
        if (isVisible && hasNextPage) {
            fetchNextPage();
        }
        scrollTopHandler();
    }, [fetchNextPage, hasNextPage, isVisible]);

    return (
        <PageContainer pageTitle="Browse Metadit">
            <AnimatePresence>
                {scrollToTop && (
                    <motion.div
                        onClick={() => window.scrollTo(0, 0)}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-primary
            w-fit font-bold px-5 h-10 rounded-full flex z-50
             items-center justify-center text-[13px] fixed right-10 bottom-10 hover:bg-primaryDark cursor-pointer"
                    >
                        Back to Top
                        <FontAwesomeIcon className="ml-2" icon={faArrowUp} />
                    </motion.div>
                )}
            </AnimatePresence>
            <ContentTabs
                setActiveTab={(arg: string) => setTab(arg)}
                activeTab={tab}
            />
            <div className="flex flex-col gap-5 relative">
                {isLoading || (isFetching && !isRefetching) ? (
                    <div className="mt-32">
                        <Loading size={30} />
                    </div>
                ) : (
                    data?.pages.map((page, index) => {
                        return page.map((post: IThread) => {
                            if (data?.pages.length === index + 1) {
                                return (
                                    <Post
                                        ref={lastPostRef}
                                        threads={page}
                                        data={post}
                                        key={post.threadid}
                                    />
                                );
                            } else {
                                return (
                                    <Post
                                        threads={page}
                                        data={post}
                                        key={post.threadid}
                                    />
                                );
                            }
                        });
                    })
                )}
                {!hasNextPage && !isLoading && (
                    <p className="w-full text-center mt-5 text-zinc-700">
                        No more posts to load
                    </p>
                )}
            </div>
        </PageContainer>
    );
};

export default Browse;

export const getServerSideProps = ({ query }: NextPageContext) => {
    return {
        props: {
            tabParams: query.tab || "hot",
        },
    };
};

Browse.getLayout = (page: any) => <Layout>{page}</Layout>;
