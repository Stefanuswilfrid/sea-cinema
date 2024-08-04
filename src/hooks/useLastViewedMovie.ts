import { create } from "zustand";

interface LastViewedMovieState {
  lastViewedMovie: {
    movieName: string;
    pathname: string;
  } | null;

  actions: {
    handleValueMismatch: () => void;
    hydrateLastViewedMovie: () => void;
  };
}

export const LAST_VIEWED_MOVIE_KEY = "last-viewed-movie";

const useLastViewedMovieStore = create<LastViewedMovieState>()((set) => ({
  lastViewedMovie: null,
  actions: {
    handleValueMismatch: () => {
      try {
        const lastViewedHanzi = localStorage.getItem(LAST_VIEWED_MOVIE_KEY);
        if (lastViewedHanzi) {
          !JSON.parse(lastViewedHanzi).pathname && localStorage.removeItem(LAST_VIEWED_MOVIE_KEY);
        }
      } catch {
        localStorage.removeItem(LAST_VIEWED_MOVIE_KEY);
      }
    },
    hydrateLastViewedMovie: () =>
      set((_) => {
        const lastViewedMovie = localStorage.getItem(LAST_VIEWED_MOVIE_KEY);
        if (!lastViewedMovie) return { lastViewedMovie: null };
        return {
          lastViewedMovie: JSON.parse(lastViewedMovie),
        };
      }),
  },
}));

export const useLastViewedMovie = () => useLastViewedMovieStore((state) => state.lastViewedMovie);

export const useLastViewedMovieActions = () => useLastViewedMovieStore((state) => state.actions);
