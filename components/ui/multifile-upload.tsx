"use Client";

import { UploadDropzone } from "./uploadthing";
import "@uploadthing/react/styles.css"

import { X } from "lucide-react";
import Image from "next/image";
import { UploadFileResponse } from "uploadthing/client";

interface MultiFileUploadProps {
    onChange: (urls?: string[]) => void,
    value: string[],
    endpoint: "multipleImages"
}

const MultiFileUpload = ({onChange, value, endpoint}: MultiFileUploadProps) => {
    
    console.log(value,"This is the XD new value")
 
    if (value.length > 0) return (
      <div className="relative w-64 h-96">
        {value.map((url) => (<Image key={url} src={url} alt="Image" fill />))}
        
        <button className="absolute top-0 right-0 my-[-8px] mx-[-6px] text-white bg-rose-500 rounded-full p-1 shadow-sm"
                type="button" onClick={() => onChange(value)}>
          <X className="w-4 h-4" />
        </button>
      </div>
    );
    
    
    return (
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => onChange(res?.map((file: UploadFileResponse) => file.url))}
        onUploadError={(error: Error)=>{console.log(error)}}
      />
    );
}
 

export default MultiFileUpload;