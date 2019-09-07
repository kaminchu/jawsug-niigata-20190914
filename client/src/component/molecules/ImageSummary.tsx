import React from "react";
import Image from "../atoms/Image";

type Props = {
  srcs: string[];
};

const ImageSummary: React.SFC<Props> = ({srcs}) => {
  return (
    <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-start", alignContent: "flex-start "}}>
      {srcs.map((src, i) => <Image src={src} key={i}/>)}
    </div>
  );
};

export default ImageSummary;
