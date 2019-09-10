import React from "react";
import Button from "../atoms/Button";
import InputImage from "../atoms/InputImage";

type Props = {
  onUpload: () => void;
  onSelectFile: (file: null | File) => void;
};

const ImageUploader: React.FC<Props> = ({onUpload, onSelectFile}) => {
  return (
    <div style={{display: "flex", alignItems: "align-items"}}>
      <InputImage　onChangeFile={onSelectFile}/>
      <Button text="送信" onClick={onUpload}/>
    </div>
  );
};

export default ImageUploader;
