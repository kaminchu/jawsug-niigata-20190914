import React from "react";
import Button from "../atoms/Button";
import InputImage from "../atoms/InputImage";

type Props = {
  onUpload: () => void;
  onSelectFile: (file: null | File) => void;
  file: null | File;
};

const ImageUploader: React.FC<Props> = ({onUpload, onSelectFile, file}) => {
  return (
    <div style={{display: "flex", alignItems: "align-items"}}>
      <InputImage　onChangeFile={onSelectFile} file={file}/>
      <Button text="送信" onClick={onUpload}/>
    </div>
  );
};

export default ImageUploader;
