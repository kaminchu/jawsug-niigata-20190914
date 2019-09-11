import React from "react";

import Viewer from "../component/organisms/Viewer";
import ImageRepository from "../api/ImageRepository";
const imageRepository = new ImageRepository();

const App: React.FC =  () => {
  const [images, setImages] = React.useState<string[]>([]);
  const [file, setFile] = React.useState<null | File>(null);

  React.useEffect(() => {
    (async () => {
      const fetchedImages = await imageRepository.findAll();
      setImages(fetchedImages);
    })();
  }, []);

  const handleUpload = () => {
    if(file){
      (async () => {
        await imageRepository.save(file);
        setFile(null);
      })();
    } else {
      alert("ファイルが選択されていません");
    }
  };
  const handleSelectFile = (file: null | File) => {
    setFile(file);
  };
  return (
    <div>
      <Viewer srcs={images} onUpload={handleUpload} onSelectFile={handleSelectFile} file={file}/>
    </div>
  );
};

export default App;
