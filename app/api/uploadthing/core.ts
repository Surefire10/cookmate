
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { authOptions } from "../auth/[...nextauth]/route";

const fileUploader = createUploadthing();


export const  ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: fileUploader({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload

      const session =  await getServerSession(authOptions)
      const user =  session?.user

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { 
        userId: session!.user.id,
        username : session!.user.name            
    };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for username:", metadata.username);
 
      console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
    
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

