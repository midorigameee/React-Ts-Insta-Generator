import React from "react";
import PostToInstagram from "./components/InstagramPostForm";

const Home = () => {
  //   const [text, setText] = useState<string | null>(null);
  //   const [imageSrc, setImageSrc] = useState<string | null>(null);

  return (
    <>
      <h1>Image Uplodaer</h1>
      <PostToInstagram />
    </>
  );
};

export default Home;
