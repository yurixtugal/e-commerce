"use Client";

import { UploadDropzone } from "./uploadthing";
import "@uploadthing/react/styles.css"

import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
    onChange: (url?: string) => void,
    value: string,
    endpoint: "messageFile" | "singleImage"
}

const FileUpload = ({onChange, value, endpoint}: FileUploadProps) => {
    
    console.log(value,"This is the new value")
 
    if (value) return (
      <div className="relative w-64 h-96">
        <Image src={value} alt="Image" fill />
        <button className="absolute top-0 right-0 my-[-8px] mx-[-6px] text-white bg-rose-500 rounded-full p-1 shadow-sm"
                type="button" onClick={() => onChange("")}>
          <X className="w-4 h-4" />
        </button>
      </div>
    );
    
    
    return (
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => onChange(res?.[0].url)}
        onUploadError={(error: Error)=>{console.log(error)}}
      />
    );
}
 

export default FileUpload;