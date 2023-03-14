import {
    useState,
    useEffect,
    RefObject,
    Dispatch,
    SetStateAction,
} from "react";

/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} el
 * @param {boolean} initialState
 */

interface UseDetectOutsideClick {
    (el: RefObject<HTMLDivElement>, initialState: any): [
        boolean,
        Dispatch<SetStateAction<boolean>>
    ];
}

export const useDetectOutsideClick = (
    el: RefObject<HTMLDivElement>,
    initialState: any
): UseDetectOutsideClick[] => {
    const [isActive, setIsActive] = useState(initialState);

    useEffect(() => {
        const onClick = (e: any) => {
            // If the active element exists and is clicked outside of
            if (el.current !== null && !el.current.contains(e.target)) {
                setIsActive(!isActive);
            }
        };

        // If the token is active (ie open) then listen for clicks outside
        if (isActive) {
            window.addEventListener("click", onClick);
        }

        return () => {
            window.removeEventListener("click", onClick);
        };
    }, [isActive, el]);

    return [isActive, setIsActive];
};
