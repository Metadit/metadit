import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  links: { icon: IconProp; text: string; href: string; onClick?: () => void }[];
}

const Dropdown = ({ links }: Props) => {
  return (
    <div
      className="absolute w-full p-2
    bg-contentBg border border-zinc-800 left-0
    text-[13px] top-9 rounded-md text-center
    flex flex-col gap-1.5"
    >
      {links.map((link, i) => (
        <div
          onClick={link.onClick}
          className="transition-all duration-200 hover:text-primary"
          key={i.toString()}
        >
          <FontAwesomeIcon className="mr-1" icon={link.icon} />
          <a href={link.href}>{link.text}</a>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
