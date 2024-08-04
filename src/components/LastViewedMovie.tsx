import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from "next/router";
import { useLastViewedMovie, useLastViewedMovieActions } from '@/hooks/useLastViewedMovie';
import { motion } from 'framer-motion';

export default function LastViewedMovie() {
    const { handleValueMismatch, hydrateLastViewedMovie } = useLastViewedMovieActions();
    const router = useRouter();
    const isInteracted = React.useRef(false);
    const lastViewedMovie = useLastViewedMovie();
    const isDetailPage = router.pathname.startsWith('/movie/'); // Adjust as needed

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            handleValueMismatch();
            hydrateLastViewedMovie();
        }
    }, [handleValueMismatch, hydrateLastViewedMovie]);

    React.useEffect(() => {
        if (isInteracted.current) toast.dismiss();
        
        const timeout = setTimeout(() => {
            if (lastViewedMovie && !isInteracted.current && !isDetailPage) {
                isInteracted.current = true;
                toast.custom(
                    (t) => (
                        <motion.div
                            className="flex-grow antialiased"
                            initial={{ opacity: 0, y: '0%' }}
                            animate={{ opacity: 1, y: '50%' }}
                            exit={{ opacity: 0, y: '0%' }}
                            transition={{ type: 'tween', duration: 0.4 }}
                        >
                            <div className="border border-secondary/10 font-sans mx-auto min-w-[300px] select-none w-fit rounded-full bg-white whitespace-nowrap py-2 pl-6 pr-2 flex items-center gap-3">
                                <div className="shrink-0 mt-0.5 w-2 h-2 rounded-full bg-sky-400 indicator-blue"></div>
                                <span className="shrink-0 flex-1 text-sm">
                                    {lastViewedMovie.movieName} <span className="text-xs">(Last Visited)</span>
                                </span>
                                <button
                                    className="px-2 pt-0.5 pb-1.5 w-16 h-10 shrink-0 rounded-full text-sm bg-sky-500/10 active:bg-sky-500/20 transition text-blue-300 font-medium"
                                    onClick={() => {
                                        router.push(lastViewedMovie.pathname);
                                        toast.dismiss();
                                    }}
                                >
                                    &#x2192;
                                </button>
                            </div>
                        </motion.div>
                    ),
                    {
                        id: "last-viewed-movie",
                        duration: Infinity,
                    }
                );
            }
        }, 300);

        return () => {
            clearTimeout(timeout);
        };
    }, [lastViewedMovie, router, isDetailPage]);

    return null;
}
