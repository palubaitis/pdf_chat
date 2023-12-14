import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function FileUpload({
  successToast,
  errorToast,
}: {
  successToast: () => void;
  errorToast: (errorMessage: string) => void;
}) {
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
      formData.append("upload", selectedFile);

      try {
        const response = await fetch("/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("Uploaded filename:", data.filename);

        successToast();
      } catch (error) {
        console.error("Error uploading file:", error);
        errorToast("Error uploading file. Please try again.");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <Toaster />
    </>
  );
}
