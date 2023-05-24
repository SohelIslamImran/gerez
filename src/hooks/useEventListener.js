/* eslint-disable consistent-return */
import { useEffect, useRef } from "react";

const useEventListener = (eventName, handler, element = window) => {
    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;
        element.addEventListener(eventName, savedHandler.current);
        return () => element.removeEventListener(eventName, savedHandler.current);
    }, [eventName, element]);
};

export default useEventListener;
