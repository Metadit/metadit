import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faFire,
  faWandSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const tabOptions = [
  { name: "Top", icon: faRocket },
  { name: "Hot", icon: faFire },
  { name: "New", icon: faWandSparkles },
];

interface TabsKey {
  name: string;
  icon: IconDefinition;
}

enum Tabs {
  Top = 0,
  Hot = 1,
  New = 2,
}

const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const params = useSearchParams();
  const navigate = useRouter();
  const getTabParams = params.get("tab");
  const tabHandler = (tab: TabsKey, index: number) => {
    setActiveTab(index);
    navigate.replace("/browse?tab=" + tab.name.toLowerCase());
  };
  const paramsHandler = () => {
    if (getTabParams === "hot") {
      setActiveTab(Tabs.Hot);
    } else if (getTabParams === "new") {
      setActiveTab(Tabs.New);
    } else {
      setActiveTab(Tabs.Top);
    }
  };
  useEffect(() => {
    paramsHandler();
  }, [getTabParams]);

  return (
    <div
      className="w-full
      border border-zinc-800
      rounded-xl mx-auto px-10 bg-contentBg
      mb-8
  flex gap-8 items-center py-5
    mt-8"
    >
      {tabOptions.map((tab, i) => {
        return (
          <p
            key={i}
            onClick={() => tabHandler(tab, i)}
            className={`text-md text-content font-bold cursor-pointer transition-all duration-200 ${
              activeTab === i ? "text-primary" : "text-zinc-500"
            }`}
          >
            <FontAwesomeIcon
              className={`text-md text-content mr-1 transition-all duration-200 ${
                activeTab === i ? "text-primary" : "text-zinc-500"
              }`}
              icon={tab.icon}
            />
            {tab.name}
          </p>
        );
      })}
    </div>
  );
};

export default ContentTabs;
