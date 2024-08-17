import { useSpeech } from "@/libs/use-speech";
import { useMemo, useState } from "react";
import { Pause } from 'lucide-react';

export function AudioButton({
  text,
  speed = 1,
  size = "normal",
}: {
  text: string;
  speed?: number;
  size?: "small" | "normal" | "large";
}) {
    const memoizedContent = useMemo(() => [text], [text]);

    const { play, playbackState, pause } = useSpeech(memoizedContent);
    const audioPlaying = playbackState === "playing";


  return (
    <button  onClick={()=>{audioPlaying ? pause() :play()}}  className="flex gap-5 items-center justify-center w-[120px] h-12 text-white bg-white/40 rounded-full cursor-pointer">
      {audioPlaying ? <Pause className="h-[30px] w-[30px]"/>  : 
      <img src="/images/icon-play.svg" alt="" className="h-[30px] w-[30px]" />}
      <span className="">Play</span>
    </button>
  );
}
