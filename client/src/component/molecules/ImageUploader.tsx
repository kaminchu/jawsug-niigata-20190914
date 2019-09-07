import React from "react";
import Button from "../atoms/Button";
import InputImage from "../atoms/InputImage";

type Props = {
  onUpload: (file: File) => void;
};

const ImageUploader: React.FC<Props> = ({onUpload}) => {
  const [file, setFile] = React.useState<null | File>(null);

  const handleUpload = () => {
    if(file){
      onUpload(file);
    } else {
      alert("ファイルを選択してください");
    }
  };

  return (
    <div style={{display: "flex", alignItems: "align-items"}}>
      <InputImage　onChangeFile={setFile}/>
      <Button text="送信" onClick={handleUpload}/>
    </div>
  );
};

export default ImageUploader;
