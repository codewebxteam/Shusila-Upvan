import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const loadingPhrases = [
  "Charting your career course...",
  "Crafting a path to success...",
  "Unlocking career insights...",
  "Aligning your professional stars...",
  "Mapping your future...",
];

// ❌ Removed loadSessions because we don’t want to persist sessions
function saveSessions(sessions) {
  localStorage.setItem("local_db", JSON.stringify(sessions));
}

export default function ChatApp({
  open = false,
}) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState(loadingPhrases[0]);

  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);

  const currentMessages =
    sessions.find((s) => s.id === currentSession)?.messages || [];

  const setCurrentMessages = (msgs) => {
    if (!currentSession) return;
    setSessions((prev) => {
      const updated = prev.map((s) =>
        s.id === currentSession ? { ...s, messages: msgs } : s
      );
      saveSessions(updated);
      return updated;
    });
  };

  // 🔹 Always reset sessions on fresh page load
  useEffect(() => {
    localStorage.removeItem("careerist_sessions");
    setSessions([]);
    setCurrentSession(null);
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingPhrase((prev) => {
          const idx = loadingPhrases.indexOf(prev);
          return loadingPhrases[(idx + 1) % loadingPhrases.length];
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [open]);

  const sendMessage = async (e, sampleQuery = null) => {
    if (e && e.preventDefault) e.preventDefault();
    const messageToSend = sampleQuery || query;
    if (!messageToSend.trim()) return;

    let activeSession = currentSession;
    if (!activeSession) {
      const newSession = {
        id: "sess_" + Date.now().toString(36),
        title: "New Chat",
        messages: [],
      };
      activeSession = newSession.id;
      setSessions([newSession]);
      setCurrentSession(newSession.id);
    }

    const userMsg = { role: "human", content: messageToSend };
    setCurrentMessages([...currentMessages, userMsg]);
    setLoading(true);

    try {
      // ✅ Send JSON instead of FormData
      const res = await fetch(`${backendUrl}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: messageToSend }),
      });

      const data = await res.json();
      const aiMsg = { role: "ai", content: data.answer || "(no answer)" };
      setCurrentMessages([...currentMessages, userMsg, aiMsg]);
    } catch {
      setCurrentMessages([
        ...currentMessages,
        userMsg,
        { role: "ai", content: "⚠️ Error contacting backend." },
      ]);
    }

    setQuery("");
    setLoading(false);
  };
  
  return (
    <div className="w-full h-full flex flex-col bg-mint-400 text-white">
      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-auto p-4 space-y-4"
      >
        {currentMessages.length === 0 && !loading && (
          <div className="text-center text-white-400 py-6">
            <img src="src/assets/cow 2.jpg" alt="Logo" className="mx-auto mb-4 w-20 h-20" />
            <div className="text-lg font-semibold mb-2"> Shusila Upvan Milk Diary 🥛 🚀</div>
            <div className="text-sm text-white-400 font-medium"> Track • Analyze • Improve</div>
            <div className="mt-6 grid gap-3 max-w-md mx-auto">
              <button
                onClick={() => sendMessage(null, "Show today's milk collection report.")}
                className="bg-indigo-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-white-400 p-3 rounded-xl"
              >
                "Show today's milk collection report."
              </button>
              <button
                onClick={() => sendMessage(null, "How much milk was collected in the last 7 days?")}
                className="bg-indigo-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-white-500 p-3 rounded-xl"
              >
                "How much milk was collected in the last 7 days?"
              </button>
              <button
                onClick={() => sendMessage(null, "Generate full monthly summary for Shusila Upvan dairy.")}
                className="bg-indigo-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-white-400 p-3 rounded-xl"
              >
                "Generate full monthly summary for Shusila Upvan dairy."
              </button>
            </div>
          </div>
        )}

        {currentMessages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "human" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl ${m.role === "human"
                  ? "bg-gradient-to-r from-lime-500 to-yellow-400 text-white rounded-br-none"
                  : "bg-indigo-400 text-gray-200 rounded-bl-none"
                }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {m.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start text-gray-400">
            <div className="px-4 py-2 flex items-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
              <span>{loadingPhrase}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-3 border-t border-lime-400/30 flex items-center gap-2 bg-green-500]"
      >
        <textarea
          ref={textareaRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={loading ? loadingPhrase : "Type your question..."}
          className="flex-1 px-3 py-2 rounded-lg bg-indigo-500 border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white resize-none"
          rows={1}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-white-400 text-white-500 font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
