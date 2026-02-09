import { useState, useEffect } from 'react';

export const useLoading = (minimumLoadingTime = 2000) => {
    const [isLoading, setIsLoading] = useState(true);
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    useEffect(() => {
        // Set minimum loading time
        const timer = setTimeout(() => {
            setAssetsLoaded(true);
        }, minimumLoadingTime);

        // Also check for actual page load
        const handleLoad = () => {
            setAssetsLoaded(true);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener('load', handleLoad);
        };
    }, [minimumLoadingTime]);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return {
        isLoading: isLoading && !assetsLoaded,
        handleLoadingComplete,
    };
};
