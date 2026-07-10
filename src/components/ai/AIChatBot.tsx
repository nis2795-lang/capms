import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, FileText, BarChart, Paperclip, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}

export default function AIChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am your AI Assistant. I can help you summarize client data, answer tax query rules, or check compliance status. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'Check pending tasks for ABC Pvt Ltd',
        'Summarize recent GST notifications',
        'Who are my high-risk clients?'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiText = "I'm looking into that for you. Based on the firm's data, everything seems to be on track.";
      
      if (text.toLowerCase().includes('abc pvt ltd')) {
        aiText = "ABC Pvt Ltd has 2 pending tasks: GST Data Collection (Overdue by 2 days) and Books Finalization. Their overall health score is Yellow.";
      } else if (text.toLowerCase().includes('gst')) {
        aiText = "The latest GST notifications extend the due date for GSTR-1 for certain categories. Would you like me to draft an email update to all affected clients?";
      } else if (text.toLowerCase().includes('high-risk') || text.toLowerCase().includes('risk')) {
        aiText = "You currently have 3 high-risk clients based on delayed document submission and pending compliances: PQR LLP, Global Exports, and Sharma Family HUF.";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-zinc-200 pb-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
             <Bot className="h-8 w-8 text-purple-600 relative z-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">AI Firm Assistant</h1>
            <div className="flex items-center gap-2 text-xs font-mono opacity-60 uppercase mt-2">
               <Sparkles className="h-3 w-3 text-purple-600" />
               <span>Powered by Firm Knowledge Graph</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white border border-zinc-200 rounded-xl flex flex-col overflow-hidden shadow-sm">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50/30">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  msg.sender === 'user' ? 'bg-zinc-900 text-white' : 'bg-purple-100 text-purple-600'
                }`}>
                  {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                {/* Message Bubble */}
                <div className="flex flex-col gap-2">
                  <div className={`px-5 py-3.5 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-zinc-900 text-white rounded-tr-sm' 
                      : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  
                  {/* Timestamp */}
                  <div className={`text-[10px] font-mono text-zinc-400 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>

                  {/* Suggested Actions */}
                  {msg.suggestedActions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.suggestedActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(action)}
                          className="bg-white border border-zinc-200 text-zinc-600 hover:text-purple-700 hover:border-purple-300 hover:bg-purple-50 transition-colors px-3 py-1.5 rounded-full text-xs font-medium shadow-sm"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-4 max-w-[80%] flex-row">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-purple-100 text-purple-600">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="px-5 py-4 rounded-2xl bg-white border border-zinc-200 rounded-tl-sm shadow-sm flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-zinc-200">
          <div className="flex items-end gap-3 bg-zinc-50 border border-zinc-200 rounded-xl p-2 focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-400 transition-all shadow-sm">
            <button className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors rounded-lg hover:bg-zinc-200/50">
              <Paperclip className="h-5 w-5" />
            </button>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about clients, compliance status, or tax rules..."
              className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 min-h-[44px] py-3 text-[14px] text-zinc-800 placeholder:text-zinc-400"
              rows={1}
              style={{ minHeight: '44px' }}
            />
            <button 
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-0.5 shadow-sm"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-6 text-[11px] font-medium text-zinc-400">
            <span className="flex items-center gap-1.5"><FileText className="h-3 w-3" /> Reads Client Documents</span>
            <span className="flex items-center gap-1.5"><BarChart className="h-3 w-3" /> Analyzes Firm Data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
