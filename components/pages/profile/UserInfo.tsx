import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";

interface Props {
  icon: IconDefinition;
  info: string;
  children?: React.ReactNode;
  name: string;
}

const UserInfo = ({ icon, info, children, name }: Props) => {
  return (
    <div className="w-[80%] mx-auto rounded bg-darkContent border border-zinc-800 mb-2">
      <div className="flex flex-wrap justify-between py-3 px-4">
        <Tippy content={name}>
          <div className="flex items-center gap-2 w-full max-w-[80%] md:max-w-[90%]">
            <FontAwesomeIcon className="text-white text-[13px]" icon={icon} />
            <p
              className={`text-white text-[13px] w-auto overflow-hidden text-ellipsis
                whitespace-nowrap`}
            >
              {info}
            </p>
          </div>
        </Tippy>
        {children ? children : null}
      </div>
    </div>
  );
};

export default UserInfo;
