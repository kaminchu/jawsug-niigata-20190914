import React from "react";
import ImageSummary from "../molecules/ImageSummary";
import ImageUploader from "../molecules/ImageUploader";

type Props = {
  srcs: string[];
};

const Viewer: React.SFC<Props> = ({srcs}) => {
  return (
    <div>
      <ImageSummary srcs={srcs}/>
      <ImageUploader onUpload={(file) => {console.log(file)}}/>
    </div>
  );
};

export default Viewer;
