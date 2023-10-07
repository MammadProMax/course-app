"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Chapter } from "@prisma/client";

import { Grip, Pencil } from "lucide-react";
import {
   DragDropContext,
   Droppable,
   Draggable,
   DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type AppProps = {
   items: Chapter[];
   onReorder: (updatedData: Pick<Chapter, "id" | "position">[]) => void;
};

const ChaptersList = ({ items, onReorder }: AppProps) => {
   const [isMounted, setIsMounted] = useState(false);
   const [chapters, setChapters] = useState(items);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   useEffect(() => {
      setChapters(items);
   }, [items]);

   const handleDragEnd = (result: DropResult) => {
      if (
         !result.destination ||
         result.destination.index === result.source.index
      )
         return;

      const items = [...chapters];
      const [reorederedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorederedItem);

      setChapters(items);

      const startIndex = Math.min(
         result.source.index,
         result.destination.index
      );
      const endIndex = Math.max(result.source.index, result.destination.index);
      const updatedItems = items.slice(startIndex, endIndex + 1);

      const bulkUpdateChapters = updatedItems.map((chapter) => ({
         id: chapter.id,
         position: items.findIndex((data) => data.id === chapter.id),
      }));
      onReorder(bulkUpdateChapters);
   };

   if (!isMounted) return null;
   return (
      <DragDropContext onDragEnd={handleDragEnd}>
         <Droppable droppableId="chapters">
            {(provided) => (
               <div {...provided.droppableProps} ref={provided.innerRef}>
                  {chapters.map((chapter, index) => (
                     <Draggable
                        key={chapter.id}
                        draggableId={chapter.id}
                        index={index}
                     >
                        {(provided) => (
                           <div
                              className={cn(
                                 "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                                 chapter.isPublished &&
                                    "bg-sky-100 border-sky-200 text-sky-700"
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                           >
                              <div
                                 className={cn(
                                    "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                    chapter.isPublished &&
                                       "border-r-sky-200 hover:bg-sky-200"
                                 )}
                                 {...provided.dragHandleProps}
                              >
                                 <Grip className="h-5 w-5" />
                              </div>
                              {chapter.title}
                              <div className="ml-auto pr-2 flex items-center gap-x-2">
                                 {chapter.isFree && <Badge>Free</Badge>}
                                 <Badge
                                    className={cn(
                                       "bg-slate-500 cursor-default hover:bg-slate-500",
                                       chapter.isPublished && "bg-sky-700"
                                    )}
                                 >
                                    {chapter.isPublished
                                       ? "Published"
                                       : "Draft"}
                                 </Badge>
                                 <Link
                                    href={`${chapter.courseId}/chapters/${chapter.id}`}
                                 >
                                    <Badge
                                       className={cn(
                                          "bg-slate-500 cursor-pointer hover:border hover:bg-transparent hover:text-slate-700 hover:border-slate-700 transition"
                                       )}
                                    >
                                       <Pencil className="w-4 h-4" />
                                    </Badge>
                                 </Link>
                              </div>
                           </div>
                        )}
                     </Draggable>
                  ))}
                  {provided.placeholder}
               </div>
            )}
         </Droppable>
      </DragDropContext>
   );
};

export default ChaptersList;
