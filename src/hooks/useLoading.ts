import { useState, useEffect } from 'react';

export const useLoading = (minimumLoadingTime = 2000) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Force minimum loading time - loading screen will always show for this duration
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, minimumLoadingTime);

        return () => {
            clearTimeout(timer);
        };
    }, [minimumLoadingTime]);

    return {
        isLoading,
    };
};
