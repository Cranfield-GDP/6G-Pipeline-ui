"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", content: "Hello! Provide your AI requirements?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("chat_user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = uuidv4();
      localStorage.setItem("chat_user_id", newUserId);
      setUserId(newUserId);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, userId }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: formatResponse(data) },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: "Error connecting to server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const selectModel = async (model: string) => {
    try {
      const response = await fetch("/api/model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, user_id: userId }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: formatResponse(data) },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: "Error selecting model." },
      ]);
    }
  };

  const formatResponse = (data) => {
    if (data.models && Array.isArray(data.models)) {
      return (
          <div className="space-y-2">
            <p className="mb-2 font-semibold">Select a Model:</p>
            <div className="grid grid-cols-1 gap-2">
              {data.models.map((modelObj, idx) => (
                  <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-gray-700 rounded-lg border border-gray-600"
                  >
                    <button
                        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition text-white w-full"
                        onClick={() => selectModel(modelObj.model)}
                    >
                      {modelObj.model}
                    </button>
                    {modelObj.modelUrl && (
                        <a
                            href={modelObj.modelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-xl"
                            title="View Model"
                        >
                          🔗
                        </a>
                    )}
                  </div>
              ))}
            </div>
          </div>
      );
    } else if (data.questions && Array.isArray(data.questions)) {
      return (
          <div>
            {data.questions.map((q, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-semibold">{`${idx + 1}. ${q.question}`}</p>
                  <p className="text-sm text-gray-400">💡 {q.rationale}</p>
                </div>
            ))}
          </div>
      );
    } else if(data.message){
      return data.message;
    }else if (data.reply) {
      return data.reply;
    } else if (data.error) {
      return <p className="text-red-500">⚠️ {data.error}</p>;
    }
    return "Unexpected response.";
  };



  return (
      <div className="flex flex-col h-[80vh] max-w-2xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg">
        <div className="p-4 border-b border-gray-700 text-xl font-semibold">
          Chatbot
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, index) => (
              <div
                  key={index}
                  className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                    className={`px-4 py-2 rounded-lg max-w-xs ${
                        msg.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-700 text-gray-200"
                    }`}
                >
                  {typeof msg.content === "string" ? msg.content : <>{msg.content}</>}
                </div>
              </div>
          ))}
          {loading && <p className="text-gray-400 text-sm">Thinking...</p>}
        </div>

        <div className="p-4 border-t border-gray-700 flex">
          <input
              className="flex-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-600 outline-none"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
              className="ml-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
              onClick={sendMessage}
              disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
  );
}