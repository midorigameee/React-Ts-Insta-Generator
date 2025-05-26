import React, { useEffect } from "react";
import type { ResponseFromInsta } from "../types";

const URL: string =
  "https://graph.instagram.com/v22.0/me?fields=user_id,username&access_token=";
const ACCESS_TOKEN: string =
  "IGAARcqg4q7cZABZAE0xQ3dXRExveUxST290cmk3ajhUekdHY0loeXBtcVROYVlZAN21ZASm95dGtoRDFldExxVXlWblBtNmpoRTVhNnAyMVhEVTUya1ZAKOWpuNmJPZAGpKS1hKWHlYYnhwN3NZAZAk9xZAml1cDVQWGhkTU5EejR0dGhVMAZDZD";
const API_URL: string = URL + ACCESS_TOKEN;

interface Props {
  response: ResponseFromInsta | null;
  setResponse: React.Dispatch<React.SetStateAction<ResponseFromInsta | null>>;
}

const TestInstaConnection: React.FC<Props> = ({ response, setResponse }) => {
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(API_URL);
      const data: ResponseFromInsta = await res.json(); // 型をアサート

      console.log(data);
      setResponse(data);
    };

    fetchUser();
  }, []);

  return (
    <>
      <div>
        <p>
          {response
            ? `username : ${response.username}
            instagram id : ${response.id}`
            : "now loading..."}
        </p>
      </div>
    </>
  );
};

export default TestInstaConnection;
