import React from "react";
import ImageSummary from "../molecules/ImageSummary";
import UploadFileButton from "../atoms/UploadFileButton";

type Props = {
  srcs: string[];
  onUploadFile: (file: File) => void;
  isLoading?: boolean;
};

const Viewer: React.SFC<Props> = ({srcs, onUploadFile, isLoading}) => {
  return (
    <div>
      <ImageSummary srcs={srcs}/>
      <div style={{position: "fixed", bottom: "16px", right: "16px"}}>
      <UploadFileButton onUploadFile={onUploadFile} isLoading={isLoading}/>
      </div>
    </div>
  );
};

export default Viewer;
