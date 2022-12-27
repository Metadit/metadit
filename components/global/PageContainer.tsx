import React from "react";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
  pageTitle?: string;
}

const PageContainer = ({ children, pageTitle }: Props) => {
  return (
    <>
      {pageTitle && (
        <Head>
          <title>{pageTitle}</title>
        </Head>
      )}
      <div className="w-full max-w-[1320px] mx-auto mt-20">{children}</div>
    </>
  );
};

export default PageContainer;
