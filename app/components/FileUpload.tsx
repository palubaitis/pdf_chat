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

