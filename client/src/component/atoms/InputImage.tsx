import React from "react";

type Props = {
  onChangeFile: (file: null | File) => void;
  file: null | File;
};

const InputImage: React.SFC<Props> = ({onChangeFile, file}) => {
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event && event.target && event.target.files) {
      const file = event.target.files.item(0);
      onChangeFile(file);
    }
  };

  const labelStyle = {
    background: "#ddd",
    color: "#000",
    cursor: "pointer",
    padding: "1px 6px",
  };
  
  return (
    <label style={labelStyle}>
      {file ? file.name : "ファイルを選択"}
      <input style={{display: "none"}} type="file" onChange={handleChangeFile}accept="image/*"/>
    </label>
  );
};

export default InputImage;
