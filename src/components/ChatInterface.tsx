
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, BookOpen } from 'lucide-react';
import { getNuclearHistory } from '../services/openaiService';
import { useReadingLevel } from '../context/ReadingLevelContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'system';
  text: string;
  timestamp: Date;
}

type ReadingLevel = 'kids' | 'novice' | 'college' | 'expert';

const ReadingLevelLabels: Record<ReadingLevel, string> = {
  kids: 'Kids Edition',
  novice: 'High School',
  college: 'College Level',
  expert: 'Expert Scientist'
};

const ChatInterface: React.FC = () => {
  const { readingLevel, setReadingLevel } = useReadingLevel();
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  
  // Sample questions to help users
  const sampleQuestions = [
    "When was nuclear fission discovered?",
    "What was the Manhattan Project?",
    "Tell me about the first nuclear power plant in the US",
    "What happened at Three Mile Island?",
    "Who were the key scientists in nuclear development?"
  ];

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setInputValue(transcript);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsVoiceInputActive(false);
        toast({
          title: "Voice Input Error",
          description: `Failed to recognize speech: ${event.error}`,
          variant: "destructive"
        });
      };
    } else {
      toast({
        title: "Feature Not Supported",
        description: "Your browser doesn't support speech recognition",
        variant: "destructive"
      });
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      if (speechSynthesis && speechSynthesisRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, [toast]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (inputValue.trim() === '' || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Get response from OpenAI service
      const response = await getNuclearHistory(userMessage.text, { readingLevel });
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        text: response,
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, responseMessage]);
      
      // If voice is enabled, use text-to-speech
      if (isVoiceEnabled) {
        speakText(response);
      }
    } catch (error) {
      console.error('Error getting response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        text: "I'm sorry, I encountered an error while trying to answer your question. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to speak text using the Web Speech API
  const speakText = (text: string) => {
    if (!speechSynthesis) {
      toast({
        title: "Feature Not Supported",
        description: "Your browser doesn't support text-to-speech",
        variant: "destructive"
      });
      return;
    }
    
    // Stop any ongoing speech
    if (speechSynthesisRef.current && speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesisRef.current = utterance;
    
    // Set voice preferences (optional)
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.lang === 'en-US');
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Set events
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error', event);
      setIsSpeaking(false);
      toast({
        title: "Speech Error",
        description: "Failed to play audio narration",
        variant: "destructive"
      });
    };
    
    // Start speaking
    speechSynthesis.speak(utterance);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceOutput = () => {
    // If currently speaking, stop speech
    if (isSpeaking && speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    
    setIsVoiceEnabled(!isVoiceEnabled);
    toast({
      title: isVoiceEnabled ? "Voice Output Disabled" : "Voice Output Enabled",
      description: isVoiceEnabled ? "Responses will not be read aloud" : "Responses will be read aloud",
    });
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Feature Not Supported",
        description: "Your browser doesn't support speech recognition",
        variant: "destructive"
      });
      return;
    }
    
    setIsVoiceInputActive(prev => !prev);
    
    if (!isVoiceInputActive) {
      try {
        recognitionRef.current.start();
        toast({
          title: "Voice Input Activated",
          description: "Speak now to input your question",
        });
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast({
          title: "Voice Input Error",
          description: "Failed to start speech recognition",
          variant: "destructive"
        });
      }
    } else {
      try {
        recognitionRef.current.stop();
        toast({
          title: "Voice Input Deactivated",
          description: "Voice input has been turned off",
        });
        
        // If we have a valid input, send the message automatically
        if (inputValue.trim().length > 5) {
          handleSend();
        }
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
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
        
        {/* Reading Level Selector */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {Object.entries(ReadingLevelLabels).map(([level, label]) => (
            <button
              key={level}
              onClick={() => setReadingLevel(level as ReadingLevel)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1
                ${readingLevel === level 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
            >
              <BookOpen size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="glass-panel p-4 md:p-6 max-w-4xl mx-auto">
        <div className="flex flex-col h-[500px]">
          {/* Voice Status Indicator */}
          {(isVoiceInputActive || isSpeaking) && (
            <div className="bg-primary/10 text-primary text-sm p-2 rounded-md mb-2 flex items-center justify-center">
              {isVoiceInputActive && (
                <div className="flex items-center mr-3">
                  <Mic size={16} className="mr-1 animate-pulse" />
                  <span>Listening...</span>
                </div>
              )}
              {isSpeaking && (
                <div className="flex items-center">
                  <Volume2 size={16} className="mr-1 animate-pulse" />
                  <span>Speaking...</span>
                </div>
              )}
            </div>
          )}
          
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
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] md:max-w-[70%] p-3 rounded-lg bg-secondary">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary/80 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
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
                {isVoiceInputActive ? <Mic size={18} className="animate-pulse" /> : <MicOff size={18} />}
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
                  disabled={isLoading}
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
                disabled={inputValue.trim() === '' || isLoading}
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
            <p className="text-xs text-muted-foreground mt-1">
              Currently showing: <span className="font-medium">{ReadingLevelLabels[readingLevel]}</span> information
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center text-xs text-muted-foreground mt-4 max-w-lg mx-auto">
        <p>Information drawn from US Nuclear Regulatory Commission data and verified historical sources.</p>
      </div>
    </section>
  );
};

export default ChatInterface;
