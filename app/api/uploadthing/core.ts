import { getRole } from "@/lib/getRole";
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handelAuth = async () => {
   const { userId } = auth();
   const isAuthorized = await getRole(userId!);
   if (!userId || !isAuthorized) throw new Error("Unauthorized");
   return { userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
   courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
      .middleware(handelAuth)
      .onUploadComplete(() => {}),
   courseAttachment: f(["text", "video", "image", "audio", "pdf"])
      .middleware(handelAuth)
      .onUploadComplete(() => {}),
   chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "256MB" } })
      .middleware(handelAuth)
      .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
