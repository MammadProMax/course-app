"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { Chapter, MuxData } from "@prisma/client";
import MuxPlayer from "@mux/mux-player-react";

import toast from "react-hot-toast";
import { Pencil, Plus, VideoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import FileUploader from "@/components/global/FileUploader";
import VerifiedIconbadge from "@/components/global/VerifiedIconbadge";

type Props = {
   initialData: Chapter & { muxData?: MuxData | null };
   courseId: string;
   chapterId: string;
};

const ChapterVideoForm = ({ courseId, initialData, chapterId }: Props) => {
   // hooks
   const router = useRouter();
   const [isEditing, setIsEditing] = useState<boolean>(false);

   // other

   const handleSubmit = async (data: Pick<Chapter, "videoUrl">) => {
      try {
         toggleEdit();
         const uploadVideo = axios.patch(
            `/api/courses/${courseId}/chapters/${chapterId}`,
            data
         );

         await toast.promise(uploadVideo, {
            error: "Somthing went wrong",
            loading: "uploading ...",
            success: "video uploaded",
         });

         router.refresh();
      } catch {
         toast.error("somthing went wrong");
      }
   };
   const toggleEdit = () => setIsEditing((state) => !state);
   return (
      <div className="relative bg-slate-100 rounded-md p-4">
         <div className="font-medium flex items-center justify-between">
            <VerifiedIconbadge
               title="Chapter Video"
               Valid={!initialData.videoUrl}
            />
            <Button onClick={toggleEdit} variant="link" className="border-none">
               {isEditing ? (
                  "Cancel"
               ) : !initialData.videoUrl ? (
                  <>
                     <Plus className="h-4 w-4 mr-2" />
                     Add Video
                  </>
               ) : (
                  <>
                     <Pencil className="h-4 w-4 mr-2" />
                     Edit Video
                  </>
               )}
            </Button>
         </div>
         {!isEditing ? (
            <div className="text-slate-500">
               {/* video */}
               {initialData.videoUrl && initialData.muxData ? (
                  <>
                     <div className="relative aspect-video mt-2">
                        <MuxPlayer
                           playbackId={initialData.muxData.playbackId || ""}
                           streamType="on-demand"
                           metadata={{
                              video_id: initialData.muxData.id,
                              video_title: initialData.title,
                           }}
                        />
                     </div>
                     <div className="text-xs text-muted-foreground mt-2">
                        Videos can take a few minutes to process. Refresh the
                        page if video does not appear
                     </div>
                  </>
               ) : (
                  <div className="grid place-content-center h-40 bg-slate-200 rounded-md">
                     <VideoIcon />
                  </div>
               )}
               <div className="text-xs text-muted-foreground mt-2">
                  <span className="font-semibold">Important:</span> Make sure
                  using vpn or cloudfare (1.1.1.1) (1.0.0.1) dns to ensure your
                  connection
               </div>
            </div>
         ) : (
            <>
               <FileUploader
                  endpoint="chapterVideo"
                  onChange={(url) => {
                     if (url) {
                        handleSubmit({ videoUrl: url });
                        console.log(
                           "video url is created [chapterVideoForm] sent to database"
                        );
                     }
                  }}
               />
               <div className="text-xs text-muted-foreground mt-4">
                  Upload this chapter&apos;s video
               </div>
            </>
         )}
      </div>
   );
};

export default ChapterVideoForm;
