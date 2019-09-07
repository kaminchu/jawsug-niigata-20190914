import React from "react";

import Viewer from "../component/organisms/Viewer";
import ImageRepository from "../api/ImageRepository";
const imageRepository = new ImageRepository();

const App: React.FC =  () => {
  const [images, setImages] = React.useState<string[]>([]);

  React.useEffect(() => {
    (async () => {
      const fetchedImages = await imageRepository.findAll();
      setImages(fetchedImages);
    })();
  });

  const handleUpload = (file: File) => {
    imageRepository.save(file);
  }
  return (
    <div>
      <Viewer srcs={images} onUpload={handleUpload}/>
    </div>
  );
};

export default App;
