import { useState } from "react";

const TextInput = () => {
  const [text, setText] = useState("");

  return (
    <div className="p-4">
      <label htmlFor="text" className="block mb-2 font-semibold">
        テキストを入力：
      </label>
      <input
        type="text"
        id="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ここに入力してください"
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      {text && (
        <p className="mt-4">
          入力されたテキスト：<span className="font-bold">{text}</span>
        </p>
      )}
    </div>
  );
};

export default TextInput;
