import React from "react";

type Props = {
  onChangeFile: (file: null | File) => void;
};

const InputImage: React.SFC<Props> = ({onChangeFile}) => {
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event && event.target && event.target.files) {
      const file = event.target.files.item(0);
      onChangeFile(file);
    }
  };
  
  return (<input type="file" onChange={handleChangeFile}accept="image/*"/>);
};

export default InputImage;
