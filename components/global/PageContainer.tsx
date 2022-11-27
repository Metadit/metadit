import React from "react";

interface Props {
  children: React.ReactNode;
}

const PageContainer = ({ children }: Props) => {
  return <div className="w-full max-w-[1320px] mx-auto mt-20">{children}</div>;
};

export default PageContainer;
