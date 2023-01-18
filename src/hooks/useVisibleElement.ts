import { useEffect, useMemo, useRef, useState } from "react";

export const useVisibleElement = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const observerOptions = useMemo(() => {
        return {
            threshold: 1.0,
            rootMargin: "0px",
        };
    }, []);
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        );
        const elementTarget = elementRef.current;
        elementTarget &&
            observer.observe(elementTarget as unknown as HTMLDivElement);
        return () => {
            elementTarget &&
                observer.unobserve(elementTarget as unknown as HTMLDivElement);
        };
    }, [observerOptions, elementRef]);
    return [isVisible, elementRef];
};
