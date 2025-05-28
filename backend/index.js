import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import fetch from "node-fetch"; // または "undici"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const INSTAGRAM_USER_ID = 9894503740643865;
const ACCESS_TOKEN =
  "IGAARcqg4q7cZABZAE0xQ3dXRExveUxST290cmk3ajhUekdHY0loeXBtcVROYVlZAN21ZASm95dGtoRDFldExxVXlWblBtNmpoRTVhNnAyMVhEVTUya1ZAKOWpuNmJPZAGpKS1hKWHlYYnhwN3NZAZAk9xZAml1cDVQWGhkTU5EejR0dGhVMAZDZD";
// const ACCESS_TOKEN =
//   "EACHVXJm9JNsBOy0ZBYGeZATRm5FdlMmwFZAySRTXn32lAD9DT1z1LvoKCANEAvgLmPCgCyUHdjN0Jbz3Fb6YyFFINTcXGoV11fIVTgZCjcrK4j4gtVb01rICKrQFJ0mQmlRwgDWzpqynzNZAL2YHAbWnVaYPUClyolngfJZCbo46TlbvN8dnk73hPves5HIPELwZAxCZAudg6eGBji31ejeocgCCUgZDZD";

app.post("/api/post-to-instagram", async (req, res) => {
  const { imageUrl, caption } = req.body;

  try {
    console.log(imageUrl);
    console.log(caption);
    console.log(ACCESS_TOKEN);

    // ステップ1：メディアオブジェクト作成
    const mediaResponse = await fetch(
      `https://graph.instagram.com/v22.0/${INSTAGRAM_USER_ID}/media`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + ACCESS_TOKEN,
        },
        body: JSON.stringify({
          image_url: imageUrl,
          caption,
          media_type: "",
          // access_token: ACCESS_TOKEN,
        }),
      }
    );
    const mediaData = await mediaResponse.json();
    console.log(mediaData);

    if (!mediaData.id) {
      return res
        .status(500)
        .json({ error: "メディア作成失敗", details: mediaData });
    }

    // ステップ2：公開
    const publishResponse = await fetch(
      `https://graph.instagram.com/v22.0/${INSTAGRAM_USER_ID}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creation_id: mediaData.id,
          access_token: ACCESS_TOKEN,
        }),
      }
    );
    const publishData = await publishResponse.json();

    if (!publishData.id) {
      return res.status(500).json({ error: "公開失敗", details: publishData });
    }

    res.json({ success: true, postId: publishData.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "投稿エラー", message: err.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
