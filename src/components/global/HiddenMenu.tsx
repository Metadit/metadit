import React from "react"
import Button from "./Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faSignIn,
    faStar,
    faGlobe,
    faUser,
} from "@fortawesome/free-solid-svg-icons"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"
import SearchBox from "./SearchBox"
import { useUser } from "../../contexts/User"

interface Props {
    closeMenu: () => void
}

const HiddenMenu = ({ closeMenu }: Props) => {
    const { user } = useUser()
    return (
        <div
            className="flex-col flex gap-2 p-5 w-full justify-center bg-zinc-800
           bg-opacity-50 backdrop-blur border-b border-b-zinc-800"
        >
            <Link onClick={closeMenu} href="/src/pages/browse?tab=top">
                <Button className="w-full" normal={true}>
                    <FontAwesomeIcon icon={faGlobe} />
                    Browse
                </Button>
            </Link>
            <Link
                onClick={closeMenu}
                target="_blank"
                href="https://github.com/Metadit/metadit"
            >
                <Button className="w-full" normal={true}>
                    <FontAwesomeIcon icon={faStar} />
                    Github
                </Button>
            </Link>
            <Link
                onClick={closeMenu}
                target="_blank"
                href="https://discord.gg/r6HjT4JD5p"
            >
                <Button className="w-full" normal={true}>
                    <FontAwesomeIcon icon={faDiscord} />
                    Our Discord
                </Button>
            </Link>
            {user?.wallet_address ? (
                <>
                    <Link onClick={closeMenu} href="/profile/[id]">
                        <Button normal={true} className="bg-primary w-full">
                            <FontAwesomeIcon icon={faUser} />
                            Profile
                        </Button>
                    </Link>
                    <Link onClick={closeMenu} href="/src/pages/create">
                        <Button className="bg-primary w-full" normal={false}>
                            + Create post
                        </Button>
                    </Link>
                </>
            ) : (
                <Link onClick={closeMenu} href={"/login"}>
                    <Button className="bg-primary" normal={false}>
                        <FontAwesomeIcon icon={faSignIn} />
                        Login
                    </Button>
                </Link>
            )}
            <SearchBox className="mt-5" />
        </div>
    )
}

export default HiddenMenu
