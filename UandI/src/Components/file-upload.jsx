import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function FileUpload({
  children,
  accept,
  maxFiles,
  onChng,
  className,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (onChng) {
        onChng(acceptedFiles);
      }
    },
    [onChng],
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles,
    onDrop,
  });

  const files = acceptedFiles.map((file) => {
    if (file.type.startsWith("image/")) {
      return (
        <img
          key={file.name}
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="h-full w-full bg-cover"
        />
      );
    } else {
      return (
        <li key={file.name}>
          {file.name} - {file.size} bytes
        </li>
      );
    }
  });

  return (
    <section className="cursor-pointer">
      <div
        {...getRootProps({
          className: `flex min-h-[250px] w-full items-center justify-center rounded-xl border border-dashed border-black p-4 ${className}`,
        })}
      >
        <input {...getInputProps()} />
        {acceptedFiles.length === 0 ? children : files}
      </div>
    </section>
  );
}

export default FileUpload;