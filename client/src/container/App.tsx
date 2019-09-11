import React from "react";

import Viewer from "../component/organisms/Viewer";
import ImageRepository from "../api/ImageRepository";
const imageRepository = new ImageRepository();

const ws = new WebSocket("wss://kczvm7ga5b.execute-api.ap-northeast-1.amazonaws.com/dev");
ws.onopen = () => console.log("open wss");
ws.onclose = () => console.log("close wss");

const App: React.FC =  () => {
  const [images, setImages] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] =  React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      const fetchedImages = await imageRepository.findAll();
      setImages(fetchedImages);
    })();
  }, []);

  // socket update
  ws.onmessage = (ev) => {
    const data = typeof ev.data === "string" ? ev.data: "";// string only
    const {type} = JSON.parse(data);
    if(type === "UPDATE_BUCKET"){
      (async () => {
        const fetchedImages = await imageRepository.findAll();
        setImages(fetchedImages);
      })();
    }
  };


 
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
