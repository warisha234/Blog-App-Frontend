import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Sparkles,
} from 'lucide-react';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import './Chatbot.css';

export default function Chatbot() {

  const [open, setOpen] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        role: 'assistant',
        content:
          'Hey 👋 I’m your AI assistant. Ask me anything!',
      },
    ]);

  const [input, setInput] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const bottomRef =
    useRef(null);

  /* AUTO SCROLL */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  /* FALLBACK REPLIES */
  const fallbackReplies = [
    'Hmm 🤔 Can you explain a little more?',
    'Interesting question 👀',
    'I’m still learning new things 🚀',
    'Tell me more about that ✨',
    'I’d love to help with that 💛',
    'Can you ask differently?',
  ];

  /* SMART REPLIES */
  const smartReplies = {
    hello:
      'Hey 👋 How are you today?',

    hi:
      'Hi there ✨',

    hey:
      'Hello 🌟 How can I help you?',

    stress:
      'Try taking small breaks and deep breathing exercises 💆',

    anxiety:
      'Deep breathing and journaling can really help 🧠',

    sleep:
      'Avoid screens before sleeping 😴',

    coding:
      'Practice consistently and build projects daily 💻',

    javascript:
      'JavaScript powers modern interactive websites ⚡',

    react:
      'React helps build fast and dynamic UIs 🚀',

    motivation:
      'Small progress every day matters 🌱',

    sad:
      'I’m here for you 💛',

    lonely:
      'Sometimes talking with someone helps a lot 🤍',

    blog:
      'You can explore trending blogs on the homepage ✨',

    travel:
      'Travel refreshes the mind ✈️',

    food:
      'Good food = good mood 🍕',

    study:
      'Consistency beats motivation 📚',

    gym:
      'Fitness improves both mind and body 💪',

    business:
      'Focus on solving real problems 🚀',

    design:
      'Clean and simple design always wins 🎨',
  };

  /* GET SMART REPLY */
  const getSmartReply = (
    text
  ) => {

    const lower =
      text.toLowerCase();

    for (const key in smartReplies) {

      if (
        lower.includes(key)
      ) {
        return smartReplies[key];
      }

    }

    return fallbackReplies[
      Math.floor(
        Math.random() *
          fallbackReplies.length
      )
    ];
  };

  /* SEND MESSAGE */
  const send = async () => {

    if (
      !input.trim() ||
      loading
    )
      return;

    const userMsg =
      input.trim();

    setInput('');

    /* USER MESSAGE */
    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        content: userMsg,
      },
    ]);

    setLoading(true);

    try {

      const res =
        await fetch(
          'https://api.anthropic.com/v1/messages',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',

              'x-api-key':
                import.meta.env
                  .VITE_ANTHROPIC_KEY,

              'anthropic-version':
                '2023-06-01',

              'anthropic-dangerous-direct-browser-access':
                'true',
            },

            body: JSON.stringify({
              model:
                'claude-sonnet-4-20250514',

              max_tokens: 300,

              system:
                `You are a friendly premium AI assistant.
                 Reply in a short, modern and helpful way.`,

              messages: [
                ...messages,
                {
                  role: 'user',
                  content:
                    userMsg,
                },
              ],
            }),
          }
        );

      const data =
        await res.json();

      let botReply =
        data?.content?.[0]
          ?.text?.trim();

      /* FALLBACK IF EMPTY */
      if (!botReply) {
        botReply =
          getSmartReply(
            userMsg
          );
      }

      /* BOT MESSAGE */
      setMessages(prev => [
        ...prev,
        {
          role:
            'assistant',
          content:
            botReply,
        },
      ]);

    } catch (error) {

      /* SMART FALLBACK */
      setMessages(prev => [
        ...prev,
        {
          role:
            'assistant',
          content:
            getSmartReply(
              userMsg
            ),
        },
      ]);

    }

    setLoading(false);
  };

  return (
    <>

      <AnimatePresence>

        {open && (

          <motion.div
            className="chatbot-panel"
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
          >

            {/* HEADER */}
            <div className="chat-header">

              <div className="chat-icon">
                <Bot size={20} />
              </div>

              <div>
                <p className="chat-title">
                  AI Assistant
                </p>

                <p className="chat-subtitle">
                  Premium Neon AI
                </p>
              </div>

              <div className="chat-actions">

                <div className="ai-badge">
                  <Sparkles size={12} />
                  AI
                </div>

                <button
                  onClick={() =>
                    setOpen(false)
                  }
                  className="close-btn"
                >
                  <X size={18} />
                </button>

              </div>

            </div>

            {/* BODY */}
            <div className="chat-body">

              {messages.map(
                (m, i) => (

                  <div
                    key={i}
                    className={`msg-row ${m.role}`}
                  >

                    <div
                      className={`msg-bubble ${m.role}`}
                    >
                      {m.content}
                    </div>

                  </div>
                )
              )}

              {/* TYPING */}
              {loading && (

                <div className="typing">
                  <span />
                  <span />
                  <span />
                </div>

              )}

              <div ref={bottomRef} />

            </div>

            {/* INPUT */}
            <div className="chat-input">

              <input
                value={input}
                onChange={e =>
                  setInput(
                    e.target.value
                  )
                }
                onKeyDown={e =>
                  e.key ===
                    'Enter' &&
                  send()
                }
                placeholder="Ask anything..."
              />

              <button
                onClick={send}
                disabled={loading}
              >
                <Send size={16} />
              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* FLOAT BUTTON */}
      <button
        className="floating-btn"
        onClick={() =>
          setOpen(!open)
        }
      >

        {open ? (
          <X size={24} />
        ) : (
          <MessageCircle size={24} />
        )}

      </button>

    </>
  );
}