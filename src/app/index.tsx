import { useState } from "react";
import CameraScreen from "./explore";
import PreviewScreen from "./preview";

export default function App() {
  const [photo, setPhoto] = useState(null);
  const [gallery, setGallery] = useState([]);

  if (photo) {
    return (
      <PreviewScreen
        photo={photo}
        onDelete={() => setPhoto(null)}
        onConfirm={(uri) => {
          setGallery([...gallery, uri]);
          setPhoto(null);
        }}
      />
    );
  }

  return <CameraScreen onCapture={setPhoto} gallery={gallery} />;
}