"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { MuxData } from "@prisma/client";
import MuxPlayer from "@mux/mux-player-react";
import { cn } from "@/lib/utils";

import toast from "react-hot-toast";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

type PlayerProps = {
   chapterId: string;
   title: string;
   courseId: string;
   nextChapterId: string | undefined;
   muxData: MuxData;
   isLocked: boolean;
   completeOnEnd: boolean;
};

export default function VideoPlayer({
   chapterId,
   completeOnEnd,
   courseId,
   isLocked,
   muxData,
   nextChapterId,
   title,
}: PlayerProps) {
   const [isReady, setIsReady] = useState(false);

   return (
      <div className="relative aspect-video">
         {!isReady && !isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
               <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
         )}
         {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
               <Lock className="h-8 w-8" />
               <p className="text-sm">This chapter is locked</p>
            </div>
         )}
         {!isLocked && (
            <MuxPlayer
               title={title}
               playbackId={muxData.playbackId!}
               className={cn("rounded-sm", !isReady && "hidden")}
               onCanPlay={() => setIsReady(true)}
               onEnded={() => {}}
               autoPlay
            />
         )}
      </div>
   );
}
