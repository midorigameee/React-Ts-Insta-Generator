import { useEffect, useState } from "react";
import "./App.css";
import ImageUploader from "./ImageUplodar";
import TextInput from "./TextInput ";

const URL: string =
  "https://graph.instagram.com/v22.0/me?fields=user_id,username&access_token=";
const ACCESS_TOKEN: string =
  "IGAARcqg4q7cZABZAE0xQ3dXRExveUxST290cmk3ajhUekdHY0loeXBtcVROYVlZAN21ZASm95dGtoRDFldExxVXlWblBtNmpoRTVhNnAyMVhEVTUya1ZAKOWpuNmJPZAGpKS1hKWHlYYnhwN3NZAZAk9xZAml1cDVQWGhkTU5EejR0dGhVMAZDZD";
const API_URL: string = URL + ACCESS_TOKEN;

interface ResFromInsta {
  user_id: string; // 加工済み画像URL（例：CloudinaryなどでホストされたURL）
  username: string; // 投稿文
  id: string; // 投稿文
}

function App() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(API_URL);
      const data: ResFromInsta = await res.json(); // 型をアサート
      console.log(data);
      setUsername(data?.username ?? "Username is not found.");
    };

    fetchUser();
  }, []);

  return (
    <>
      <h1>Image Uplodaer</h1>
      <div>
        <p>{username ? username : "now loading..."}</p>
      </div>
      <TextInput />
      <ImageUploader />
    </>
  );
}

export default App;
