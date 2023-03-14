import { RefObject, useEffect, useMemo, useRef, useState } from "react";

interface IUseVisibleElement {
    isVisible: boolean;
    elementRef: RefObject<HTMLDivElement>;
}

export const useVisibleElement = (): IUseVisibleElement => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const observerOptions = useMemo(() => {
        return {
            threshold: 0.1,
            rootMargin: "0px",
        };
    }, []);
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
    );

    useEffect(() => {
        const elementTarget = elementRef.current;
        elementTarget && observer.observe(elementTarget);
        return () => {
            elementTarget && observer.unobserve(elementTarget);
        };
    }, [observer]);
    return {
        isVisible,
        elementRef,
    };
};
