import React from "react";

import Viewer from "../component/organisms/Viewer";

const srcs = Array.from({length: 10}, () => "https://placehold.jp/120x80.png");
const App: React.FC =  () => {
  return (
    <div>
      <Viewer srcs={srcs} />
    </div>
  );
};

export default App;
