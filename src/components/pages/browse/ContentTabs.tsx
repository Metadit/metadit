import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFire,
    faRocket,
    faWandSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useQueryClient } from "react-query";

const tabOptions = [
    { name: "Top", icon: faRocket },
    { name: "Hot", icon: faFire },
    { name: "New", icon: faWandSparkles },
];

interface TabsKey {
    name: string;
    icon: IconDefinition;
}

interface Props {
    setActiveTab: (tab: string) => void;
    activeTab: string;
}

const ContentTabs = ({ activeTab, setActiveTab }: Props) => {
    const navigate = useRouter();
    const queryClient = useQueryClient();
    const tabHandler = (tab: TabsKey) => {
        queryClient.removeQueries("threads");
        setActiveTab(tab.name.toLowerCase());
        navigate.replace("/browse?tab=" + tab.name.toLowerCase());
    };
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
                        onClick={() => tabHandler(tab)}
                        className={`text-md text-content font-bold cursor-pointer transition-all duration-200 ${
                            activeTab === tab.name.toLowerCase()
                                ? "text-primary"
                                : "text-zinc-500"
                        }`}
                    >
                        <FontAwesomeIcon
                            className={`text-md text-content mr-1 transition-all duration-200 ${
                                activeTab === tab.name.toLowerCase()
                                    ? "text-primary"
                                    : "text-zinc-500"
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
