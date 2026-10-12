'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChatTeardropText, X, PaperPlaneRight, Sparkle } from '@phosphor-icons/react';
import ReactMarkdown from 'react-markdown';
import { UserProfile, DailyPlan } from '../lib/generator';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface Props {
  userProfile: UserProfile;
  plan: DailyPlan[];
}

export const MetabolicCompanion: React.FC<Props> = ({ userProfile, plan }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: `Hi ${userProfile.name || 'there'}! I'm your Metabolic Guide. Ask me anything about your current routine, recipe substitutions, or how to handle eating out today.` 
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input.trim() }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          history: newMessages,
          userProfile,
          todaysPlan: plan[0]
        })
      });

      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: 'ai', content: data.reply }]);
      } else {
        throw new Error('No reply');
      }
    } catch (error) {
      setMessages([...newMessages, { role: 'ai', content: "I'm having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return createPortal(
    <>
      {/* 1. THE CHAT MODAL & OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-end sm:justify-end sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          
          {/* Invisible backdrop click-to-close */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>
          
          {/* Chat Window */}
          <div className="relative bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl w-full sm:w-[420px] h-[85vh] sm:h-[600px] max-h-[85vh] flex flex-col overflow-hidden animate-slideUp">
            
            {/* Header */}
            <div className="bg-slate-900 px-5 py-4 flex items-center justify-between shrink-0 z-10 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
                  <Sparkle size={20} weight="fill" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px] leading-tight">Metabolic Guide</h3>
                  <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold mt-0.5">AI Companion</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 flex items-center justify-center bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-all"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`
                    max-w-[85%] rounded-[20px] px-5 py-3.5 text-sm leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-teal-600 text-white rounded-tr-sm shadow-md shadow-teal-900/10' 
                      : 'bg-white text-slate-700 rounded-tl-sm shadow-sm border border-slate-100'}
                  `}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <ReactMarkdown
                        components={{
                          strong: ({ node, ...props }: any) => <strong className="font-bold text-slate-900" {...props} />,
                          ul: ({ node, ...props }: any) => <ul className="space-y-1.5 my-2 list-disc list-inside" {...props} />,
                          ol: ({ node, ...props }: any) => <ol className="space-y-1.5 my-2 list-decimal list-inside" {...props} />,
                          p: ({ node, ...props }: any) => <div className="mb-3 last:mb-0" {...props} />,
                          li: ({ node, ...props }: any) => <li className="pl-1" {...props} />
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start">
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Input Area */}
            <div className="p-4 pb-8 sm:pb-4 bg-white border-t border-slate-100 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-10">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about your routine..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-inner"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-11 h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 disabled:opacity-50 transition-all shadow-md shrink-0"
                >
                  <PaperPlaneRight size={20} weight="fill" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. THE FLOATING ACTION BUTTON */}
      {!isOpen && (
        <div className="fixed bottom-28 md:bottom-8 right-4 md:right-8 z-[900] animate-fadeIn">
          <button 
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(15,23,42,0.4)] hover:scale-105 active:scale-95 transition-all relative group border-[3px] border-white"
          >
            {/* Inner glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-teal-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <Sparkle size={26} weight="fill" className="text-teal-400" />
          </button>
        </div>
      )}
    </>,
    document.body
  );
};