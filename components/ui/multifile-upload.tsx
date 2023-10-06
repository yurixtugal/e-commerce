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
 
    if (value.length > 0) {
      return (
        <div className="flex flex-auto ">
          {value.map(url => (
            <Image key={url} src={url} alt="Image"  className="object-contain"/>
          ))}
        </div>
      )
    }else{
    
    
    return (
      <UploadDropzone 
      className="w-96"
        endpoint={endpoint}
        onClientUploadComplete={(res) => onChange(res?.map((file: UploadFileResponse) => file.url))}
        onUploadError={(error: Error)=>{console.log(error)}}
      />
    );
  }
}
 

export default MultiFileUpload;