import { useState, useEffect, useMemo } from "react";
import { createSpeechEngine, PlayingState } from "./speech";

const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const speechEngine = useMemo(() => {
    if (typeof window !== "undefined") {
      return createSpeechEngine({
        onBoundary: (e: SpeechSynthesisEvent) => {
          if (e.name === "word") {
            const wordStart = e.charIndex;
            const wordEnd = e.charIndex + e.charLength;
            setCurrentWordRange([wordStart, wordEnd]);
          }
        },
        onEnd: () => {
          setCurrentWordRange([0, 0]);
          setCurrentSentenceIdx((prev) => {
            if (prev < sentences.length - 1) {
              return prev + 1;
            }
            return 0;
          });
        },
        onStateUpdate: (state: PlayingState) => {
          setPlaybackState(state);
        },
      });
    }

    return null;
  }, [sentences]);

  useEffect(() => {
    if (typeof window !== "undefined" && speechEngine) {
      speechEngine.cancel();
      speechEngine.load(sentences[currentSentenceIdx]);
      if (currentSentenceIdx > 0) {
        speechEngine.play();
      }
    }
  }, [currentSentenceIdx, sentences, speechEngine]);

  const play = () => {
    speechEngine?.play();
  };

  const pause = () => {
    speechEngine?.pause();
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };