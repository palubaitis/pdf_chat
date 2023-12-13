// import { Inbox } from "lucide-react";
// import { useDropzone } from "react-dropzone";
// import { toast } from "react-hot-toast";
// import { uploadFileToS3 } from "~/utils/handleUpload.server";

// export default function FileUpload() {
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: { "application/pdf": [".pdf"] },
//     maxFiles: 1,
//     onDrop: async (acceptedFiles) => {
//       console.log(acceptedFiles);
//       const file = acceptedFiles[0];
//       if (file.size > 10 * 1024 * 1024) {
//         toast.error("File too large");
//         return;
//       }
//       try {
//         const data = await uploadFileToS3(file);
//         console.log("data: ", data);
//       } catch (error) {
//         console.log("data error: ", error);
//       }
//     },
//   });

//   return (
//     <div className="p-2 bg-white rounded-xl">
//       <div
//         {...getRootProps({
//           className:
//             "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
//         })}
//       >
//         <input {...getInputProps()} />

//         <Inbox className="w-10 h-10 text-blue-500" />
//         <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
//       </div>
//     </div>
//   );
// }

// import { Button } from "@/components/ui/button";
// import { Form } from "@remix-run/react";
// export default function FileUpload() {
//   return (
//     <Form method="post" action={"/upload"} encType="multipart/form-data">
//       <input type="file" name="upload" />
//       <Button type="submit">Upload</Button>
//     </Form>
//   );
// }


import React, { useState } from 'react';

export default function FileUpload  () {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('upload', selectedFile);

      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData,
          // Add headers if needed, like content type
        });

        // Handle response as needed
        const data = await response.json();
        console.log('Uploaded filename:', data.filename);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

