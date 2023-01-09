import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Input from "./Input"

interface Props {
    className?: string
}

const SearchBox = ({ className }: Props) => {
    const [active, setActive] = useState<boolean>(false)
    return (
        <div
            className={`w-full transition-all duration-200 relative bg-darkContent border
          border-zinc-800 rounded-md px-3 ${
              active && "border-primary"
          } ${className}`}
        >
            <div className="absolute mt-1 left-0 right-4 ml-auto w-fit">
                <FontAwesomeIcon
                    className="text-content text-sm"
                    icon={faSearch}
                />
            </div>
            <Input
                type="text"
                className="border-0"
                onChange={() => console.log()}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                placeholder="What's on your mind?"
                value=""
            />
        </div>
    )
}

export default SearchBox
