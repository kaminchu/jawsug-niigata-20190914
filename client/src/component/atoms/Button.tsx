import React from "react";

type Props = {
  text: string;
  onClick: () => void;
};

const Button: React.SFC<Props> = ({text, onClick}) => {
  return (<button onClick={onClick}>{text}</button>);
};

export default Button;
