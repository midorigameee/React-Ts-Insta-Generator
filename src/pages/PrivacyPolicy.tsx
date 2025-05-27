import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PrivacyPolicy: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch("/PrivacyPolicy.md")
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error("Markdown読み込み失敗", err));
  }, []);

  return (
    <div className="prose p-6">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default PrivacyPolicy;
