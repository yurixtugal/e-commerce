import { getCurrentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();
 
const handleAuth = () => {
  const { userId } = auth();  
  if (!userId) throw new Error("Unauthorized");
 
  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return { userId: userId };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  singleImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 }  })
    .middleware(handleAuth)
    .onUploadComplete(()=>{}),
  messageFile: f(["image","pdf"])
    .middleware(handleAuth)
    .onUploadComplete(()=>{}),
  multipleImages: f({ image: { maxFileSize: "4MB", maxFileCount: 5 }  })
    .middleware(handleAuth)
    .onUploadComplete(()=>{}),
  
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
