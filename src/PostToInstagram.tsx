import React, { useState } from "react";

interface PostToInstagramProps {
  imageUrl: string; // 加工済み画像URL（例：CloudinaryなどでホストされたURL）
  caption: string; // 投稿文
}

const PostToInstagram: React.FC<PostToInstagramProps> = ({
  imageUrl,
  caption,
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handlePost = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/postToInstagram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl, caption }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult("Instagramに投稿が完了しました！");
      } else {
        setResult(`エラー: ${data.error || "投稿に失敗しました。"}`);
      }
    } catch (error) {
      console.error(error);
      setResult("通信エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handlePost}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "投稿中..." : "Instagramに投稿する"}
      </button>

      {result && <p className="mt-4">{result}</p>}
    </div>
  );
};

export default PostToInstagram;
