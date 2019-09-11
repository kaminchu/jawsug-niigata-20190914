import React from "react";

import Viewer from "../component/organisms/Viewer";
import ImageRepository from "../api/ImageRepository";
const imageRepository = new ImageRepository();

const App: React.FC =  () => {
  const [images, setImages] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] =  React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      const fetchedImages = await imageRepository.findAll();
      setImages(fetchedImages);
    })();
  }, []);

 
  const handleUploadFile = (file: File) => {
    (async () => {
      setIsLoading(true);
      await imageRepository.save(file);
      setIsLoading(false);
    })();
  }
  return (
    <div style={{padding: "20px"}}>
      <Viewer srcs={images} onUploadFile={handleUploadFile} isLoading={isLoading}/>
    </div>
  );
};

export default App;
