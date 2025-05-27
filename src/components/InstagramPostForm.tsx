import React, { useState } from "react";

// const URL: string =
//   "https://graph.instagram.com/v22.0/me?fields=user_id,username&access_token=";
// const ACCESS_TOKEN: string =
//   "IGAARcqg4q7cZABZAE0xQ3dXRExveUxST290cmk3ajhUekdHY0loeXBtcVROYVlZAN21ZASm95dGtoRDFldExxVXlWblBtNmpoRTVhNnAyMVhEVTUya1ZAKOWpuNmJPZAGpKS1hKWHlYYnhwN3NZAZAk9xZAml1cDVQWGhkTU5EejR0dGhVMAZDZD";
// const API_URL: string = URL + ACCESS_TOKEN;
// const instagramUserId: number = 17841463018841323;

// interface PostToInstagramProps {
//   imageUrl: string | null; // 加工済み画像URL（例：CloudinaryなどでホストされたURL）
//   caption: string | null; // 投稿文
// }

const InstagramPostForm: React.FC = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!imageUrl || !caption) {
      alert("画像URLとキャプションを入力してください");
      return;
    }

    try {
      setStatus("Instagramへ投稿中...");

      const res = await fetch("http://localhost:3001/api/post-to-instagram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          caption,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus(`✅ 投稿成功！投稿ID: ${data.postId}`);
      } else {
        setStatus(`❌ 投稿失敗: ${JSON.stringify(data)}`);
      }
    } catch (error: any) {
      console.error(error);
      setStatus("❌ 通信エラー：" + error.message);
    }
  };

  return (
    <div className="p-4 border rounded shadow max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Instagram 投稿フォーム</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">画像URL（公開URL）</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">キャプション</label>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="キャプションを入力"
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        投稿する
      </button>

      {status && (
        <div className="mt-4 text-sm text-gray-800 whitespace-pre-wrap">
          {status}
        </div>
      )}
    </div>
  );
};

export default InstagramPostForm;
