import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faFire,
  faWandSparkles,
} from "@fortawesome/free-solid-svg-icons";

const tabOptions = [
  { name: "Top", icon: faRocket },
  { name: "Hot", icon: faFire },
  { name: "New", icon: faWandSparkles },
];

enum Tabs {
  Top = 0,
  Hot = 1,
  New = 2,
}

const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState<number>(Tabs.Top);
  const tabHandler = (tab: Tabs) => {
    setActiveTab(tab);
  };

  return (
    <div
      className="w-full
      border border-zinc-800
      rounded-xl mx-auto px-10 bg-contentBg
  flex gap-8 items-center py-5
    mt-8"
    >
      {tabOptions.map((tab, i) => {
        return (
          <p
            onClick={() => tabHandler(i)}
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
