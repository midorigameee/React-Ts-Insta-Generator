import { useState } from "react";
import "./App.css";
import ImageUploader from "./ImageUplodar";
import TextInput from "./TextInput ";

function App() {
  return (
    <>
      <h1>Image Uplodaer</h1>
      <TextInput />
      <ImageUploader />
    </>
  );
}

export default App;
