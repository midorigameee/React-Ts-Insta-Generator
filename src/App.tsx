import { useState } from "react";
import "./App.css";
import ImageUploader from "./components/ImageUplodar";
import TextInput from "./components/TextInput";
import TestInstaConnection from "./components/TestInstaConnection";
import type { ResponseFromInsta } from "./types";

function App() {
  const [response, setResponse] = useState<ResponseFromInsta | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  return (
    <>
      <h1>Image Uplodaer</h1>
      <TestInstaConnection response={response} setResponse={setResponse} />
      <TextInput text={text} setText={setText} />
      <ImageUploader imageSrc={imageSrc} setImageSrc={setImageSrc} />
    </>
  );
}

export default App;
