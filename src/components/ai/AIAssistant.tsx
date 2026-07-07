import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, FileText, Search } from 'lucide-react';

export default function AIAssistant() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I am your CAPMS AI Assistant. I can help you draft emails, analyze client data, summarize documents, or look up compliance deadlines. What can I do for you today?',
      timestamp: '09:00 AM'
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    const newMsg = {
      id: Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setQuery('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'I have analyzed the request. Based on the client data and current tax regulations, here is a suggested approach...',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-end justify-between border-b border-zinc-200 pb-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center border border-purple-200 shadow-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-zinc-900">AI Client Assistant</h1>
            <p className="text-xs text-zinc-500 font-mono mt-1">Powered by CAPMS Intelligence</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'assistant' ? 'bg-purple-600 text-white' : 'bg-zinc-200 text-zinc-600'
            }`}>
              {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            
            <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-zinc-900 text-white rounded-tr-none' 
                  : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
              <span className="text-[10px] text-zinc-400 font-mono mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Prompts */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide shrink-0">
        <button className="whitespace-nowrap inline-flex items-center px-3 py-1.5 border border-purple-200 rounded-full text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors">
          <Sparkles className="w-3 h-3 mr-1.5" />
          Draft pending fee reminder
        </button>
        <button className="whitespace-nowrap inline-flex items-center px-3 py-1.5 border border-zinc-200 rounded-full text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-50 transition-colors">
          <FileText className="w-3 h-3 mr-1.5" />
          Summarize IT Notice
        </button>
        <button className="whitespace-nowrap inline-flex items-center px-3 py-1.5 border border-zinc-200 rounded-full text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-50 transition-colors">
          <Search className="w-3 h-3 mr-1.5" />
          Check GST status for Reliance
        </button>
      </div>

      <div className="shrink-0 bg-white border border-zinc-200 rounded-xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all">
        <form onSubmit={handleSend} className="flex items-end gap-2">
          <textarea 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI Assistant anything..."
            className="flex-1 max-h-32 min-h-[44px] p-2 bg-transparent border-0 focus:ring-0 resize-none text-sm leading-relaxed"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          <button 
            type="submit"
            disabled={!query.trim()}
            className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
