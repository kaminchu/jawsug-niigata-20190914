import React from "react";
import ImageSummary from "../molecules/ImageSummary";
import ImageUploader from "../molecules/ImageUploader";

type Props = {
  srcs: string[];
  onUpload: () => void;
  onSelectFile: (file: null | File) => void;
};

const Viewer: React.SFC<Props> = ({srcs, onUpload, onSelectFile}) => {
  return (
    <div>
      <ImageSummary srcs={srcs}/>
      <ImageUploader onUpload={onUpload} onSelectFile={onSelectFile}/>
    </div>
  );
};

export default Viewer;
