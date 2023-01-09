import React from "react"
import Loading from "./Loading"
import { useUser } from "../../contexts/User"

const LoadingPage = () => {
    const { loading } = useUser()
    return (
        <>
            {loading && (
                <div
                    className="w-full
        h-full absolute z-[900] bg-contentBg
        flex items-center"
                >
                    <Loading size={60} />
                </div>
            )}
        </>
    )
}

export default LoadingPage
