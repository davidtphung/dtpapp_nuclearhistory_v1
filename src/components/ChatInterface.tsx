
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'system';
  text: string;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      text: 'Welcome to the Nuclear History Chat! Ask me any question about the history of nuclear fission and energy in the United States.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isVoiceInputActive, setIsVoiceInputActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample questions to help users
  const sampleQuestions = [
    "When was nuclear fission discovered?",
    "What was the Manhattan Project?",
    "Tell me about the first nuclear power plant in the US",
    "What happened at Three Mile Island?",
    "Who were the key scientists in nuclear development?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    
    // Simulate response (would be replaced with actual AI response)
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        text: `This is a placeholder response to your question about "${inputValue}". In the complete application, this would be an AI-generated response based on the nuclear history timeline and additional knowledge sources.`,
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, responseMessage]);
      
      // If voice is enabled, would use text-to-speech here
      if (isVoiceEnabled) {
        // Text-to-speech would be implemented here
        console.log('Voice response would play for:', responseMessage.text);
      }
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceOutput = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  const toggleVoiceInput = () => {
    setIsVoiceInputActive(!isVoiceInputActive);
    // Voice recognition would be implemented here
    if (!isVoiceInputActive) {
      console.log('Voice input would start');
    } else {
      console.log('Voice input would stop');
    }
  };

  const useSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <section id="chat" className="py-12">
      <div className="text-center mb-10">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
          Interactive Learning
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ask Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have a question about nuclear history? Ask our AI assistant and get detailed answers based on historical facts.
        </p>
      </div>
      
      <div className="glass-panel p-4 md:p-6 max-w-4xl mx-auto">
        <div className="flex flex-col h-[500px]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] md:max-w-[70%] p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Sample Questions */}
          <div className="px-4 my-3">
            <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => useSampleQuestion(question)}
                  className="text-xs bg-secondary px-3 py-1 rounded-full hover:bg-secondary/70 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleVoiceInput}
                className={`icon-button ${isVoiceInputActive ? 'text-primary' : ''}`}
                aria-label={isVoiceInputActive ? 'Stop voice input' : 'Start voice input'}
              >
                {isVoiceInputActive ? <Mic size={18} /> : <MicOff size={18} />}
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your question here..."
                  className="w-full p-3 pr-10 rounded-lg bg-secondary border border-border resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                  rows={1}
                  aria-label="Type your message"
                />
              </div>
              
              <button 
                onClick={toggleVoiceOutput}
                className={`icon-button ${isVoiceEnabled ? 'text-primary' : ''}`}
                aria-label={isVoiceEnabled ? 'Disable voice responses' : 'Enable voice responses'}
              >
                {isVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              
              <button 
                onClick={handleSend}
                disabled={inputValue.trim() === ''}
                className="button-primary"
                aria-label="Send message"
              >
                <Send size={16} className="mr-2" />
                Send
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {isVoiceEnabled ? 'Voice responses are enabled' : 'Voice responses are disabled'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
