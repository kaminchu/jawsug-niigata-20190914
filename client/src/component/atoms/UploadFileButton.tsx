import React from "react";
import { IconButton } from "@chakra-ui/core";

type Props = {
  onUploadFile: (file: File) => void;
  isLoading?: boolean;
};

// const hideInputStyle = {
//   opacity: 0,
//   appearance: "none",
//   // position: "absolute",
// };


const UploadFileButton: React.SFC<Props> = ({onUploadFile, isLoading}) => {

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    if(event && event.target && event.target.files) {
      const file = event.target.files.item(0);
      file && onUploadFile(file);
    }
  };

  const buttonProps = {
    as: "span",
    cursor: "pointer",
    size: "lg",
    icon: "add", 
    ariaLabel: "File Upload",
    isRound: true,
    isLoading: isLoading
  }

  
  return (
    <label htmlFor="file-upload">
      <IconButton {...{
        as: "span",
        cursor: "pointer",
        size: "lg",
        icon: "add", 
        "aria-label": "File Upload",
        variantColor: "teal",
        isRound: true,
        isLoading: isLoading
      } as any}
      />
      <input id="file-upload" style={{display: "none"}} type="file" onChange={handleChangeFile} accept="image/*"/>
    </label>
  );
};

export default UploadFileButton;
