"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { MuxData } from "@prisma/client";
import MuxPlayer from "@mux/mux-player-react";
import { cn } from "@/lib/utils";

import toast from "react-hot-toast";
import { Loader2, Lock, Users } from "lucide-react";

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
   const [isProblem, setIsProblem] = useState(false);
   const router = useRouter();

   useEffect(() => {
      const timer = setTimeout(() => {
         if (!isReady) {
            setIsProblem(true);
         }
      }, 8000);
      if (isReady) {
         setIsProblem(false);
      }
      return () => clearTimeout(timer);
   }, [isReady]);

   const handleProgress = async () => {
      try {
         if (completeOnEnd) {
            const promise = axios.put(
               `/api/courses/${courseId}/chapters/${chapterId}/progress`,
               {
                  isComplete: true,
               }
            );
            await toast.promise(promise, {
               loading: "Loading progress ...",
               error: "somthing went wrong",
               success: "Progress updated",
            });
         }
         if (nextChapterId) {
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
         } else router.refresh();
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="relative aspect-video">
         {!isReady && !isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
               <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
         )}
         {!isReady && !isLocked && isProblem && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-white font-semibold ">
               Somthing went wrong with video player please contact admin for
               issue
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
               onEnded={handleProgress}
            />
         )}
      </div>
   );
}
