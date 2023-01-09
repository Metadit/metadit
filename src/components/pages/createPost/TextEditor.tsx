import React, { SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBold,
    faItalic,
    faLink,
    faList,
    faStrikethrough,
} from "@fortawesome/free-solid-svg-icons";

import Tippy from "@tippyjs/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Options {
    action: string;
    icon: IconProp;
    active: boolean;
}

interface Props {
    setActiveMarkdown: React.Dispatch<SetStateAction<string[]>>;
    activeMarkdown: string[];
}

const TextEditor = ({ setActiveMarkdown, activeMarkdown }: Props) => {
    const [activeOptions, setActiveOptions] = React.useState<Options[]>([
        { action: "bold", icon: faBold, active: false },
        { action: "italic", icon: faItalic, active: false },
        { action: "strike through", icon: faStrikethrough, active: false },
        { action: "list", icon: faList, active: false },
        { action: "link", icon: faLink, active: false },
    ]);
    const activeHandler = (action: string) => {
        const newActiveOptions = activeOptions.map(option => {
            if (option.action === action) {
                option.active = !option.active;
            }
            return option;
        });
        setActiveOptions(newActiveOptions);
        setActiveMarkdown(
            newActiveOptions.reduce((acc, option) => {
                if (option.active) {
                    acc.push(option.action);
                }
                return acc;
            }, [] as string[])
        );
    };

    return (
        <div
            className="w-full h-10 border-zinc-800 bg-darkContent rounded-tl
        rounded-tr border-t border-l border-r mt-5 flex items-center justify-center px-3 gap-5"
        >
            {activeOptions.map(({ active, action, icon }, index) => (
                <Tippy key={index.toString()} content={action}>
                    <FontAwesomeIcon
                        onClick={() => activeHandler(action)}
                        onMouseDown={event => {
                            event.preventDefault();
                            document.execCommand(action, false);
                        }}
                        className={`text-content transition-all duration-200
            hover:brightness-125 cursor-pointer hover:bg-contentBg focus:outline-0 ${
                active && "text-primary"
            }`}
                        icon={icon}
                    />
                </Tippy>
            ))}
        </div>
    );
};

export default TextEditor;
