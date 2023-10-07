"use Client";

import { UploadDropzone } from "./uploadthing";
import "@uploadthing/react/styles.css";

import { X } from "lucide-react";
import Image from "next/image";
import { UploadFileResponse } from "uploadthing/client";
import { Button } from "./button";

interface MultiFileUploadProps {
  onChange: (urls?: string[]) => void;
  value: string[];
  endpoint: "multipleImages";
}

const MultiFileUpload = ({
  onChange,
  value,
  endpoint,
}: MultiFileUploadProps) => {
  if (value.length > 0) {
    return (
      <>
        <div className="flex flex-auto ">
          {value.map((url) => (
            <Image
              key={url}
              src={url}
              alt="Imagea"
              width={400}
              height={400}
              className="mx-5 "
            />
          ))}
        </div>
        <Button variant="destructive" onClick={() => onChange([])}>
          Remove Images
        </Button>
      </>
    );
  } else {
    return (
      <UploadDropzone
        className="w-96"
        endpoint={endpoint}
        onClientUploadComplete={(res) =>
          onChange(res?.map((file: UploadFileResponse) => file.url))
        }
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    );
  }
};

export default MultiFileUpload;
