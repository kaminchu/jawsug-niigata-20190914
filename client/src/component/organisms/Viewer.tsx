import React from "react";
import ImageSummary from "../molecules/ImageSummary";


type Props = {
  srcs: string[];
};

const Viewer: React.SFC<Props> = ({srcs}) => {
  return (
    <div>
      <ImageSummary srcs={srcs}/>
    </div>
  );
};

export default Viewer;
