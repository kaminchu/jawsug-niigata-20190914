import React from "react";
import ImageSummary from "../molecules/ImageSummary";
import ImageUploader from "../molecules/ImageUploader";

type Props = {
  srcs: string[];
  onUpload: () => void;
  onSelectFile: (file: null | File) => void;
  file: null | File;
};

const Viewer: React.SFC<Props> = ({srcs, onUpload, onSelectFile, file}) => {
  return (
    <div>
      <ImageSummary srcs={srcs}/>
      <ImageUploader onUpload={onUpload} onSelectFile={onSelectFile} file={file}/>
    </div>
  );
};

export default Viewer;
