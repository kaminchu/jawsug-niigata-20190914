import React from "react";
import ImageSummary from "../molecules/ImageSummary";
import ImageUploader from "../molecules/ImageUploader";

type Props = {
  srcs: string[];
  onUpload: (file: File) => void;
};

const Viewer: React.SFC<Props> = ({srcs, onUpload}) => {
  return (
    <div>
      <ImageSummary srcs={srcs}/>
      <ImageUploader onUpload={onUpload}/>
    </div>
  );
};

export default Viewer;
