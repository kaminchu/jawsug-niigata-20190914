import React from "react";

type Props = {
  src: string;
};

const Image: React.SFC<Props> = ({src}) => {
  return (<img style={{padding: "10px"}} src={src}/>);
};

export default Image;
