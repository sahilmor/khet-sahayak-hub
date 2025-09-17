import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Phone,
  AlertTriangle,
  User,
  Bot
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  language?: 'en' | 'hi';
}

const ChatBot = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: language === 'hi' 
        ? 'नमस्ते! मैं FasalGuru हूं। आपकी फसल की कोई समस्या है?'
        : 'Hello! I\'m FasalGuru. What\'s happening in your field today?',
      timestamp: new Date(),
      language
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    {
      en: "I have pests on my cotton",
      hi: "मेरी कपास में कीड़े हैं"
    },
    {
      en: "Book soil test",
      hi: "मिट्टी का टेस्ट कराना है"
    },
    {
      en: "What fertilizer to use?",
      hi: "कौन सी खाद डालूं?"
    },
    {
      en: "Market prices today",
      hi: "आज के बाजार भाव"
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: language === 'hi'
          ? 'मैं आपकी समस्या समझ रहा हूं। आप अपने खेत की तस्वीर भेज सकते हैं या और जानकारी दे सकते हैं।'
          : 'I understand your concern. You can share a photo of your field or provide more details.',
        timestamp: new Date(),
        language
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: { en: string; hi: string }) => {
    setInputMessage(language === 'hi' ? suggestion.hi : suggestion.en);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would integrate with Web Speech API
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    // Here you would integrate with Text-to-Speech
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      
      <div className="flex-1 container mx-auto px-4 py-4 flex flex-col max-w-4xl">
        {/* Chat Header */}
        <Card className="p-4 mb-4 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 bg-primary/10">
                <Bot className="h-6 w-6 text-primary" />
              </Avatar>
              <div>
                <h2 className="font-semibold text-foreground">FasalGuru AI</h2>
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' ? 'आपका कृषि सहायक' : 'Your farming assistant'}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="h-4 w-4" />
              {language === 'hi' ? 'विशेषज्ञ से बात करें' : 'Call Expert'}
            </Button>
          </div>
        </Card>

        {/* Safety Notice */}
        <Card className="p-4 mb-4 border-warning/20 bg-warning/5">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <p className="text-sm text-foreground">
                {language === 'hi'
                  ? 'सुरक्षा सूचना: मैं एक AI सहायक हूं। गंभीर समस्याओं के लिए कृपया विशेषज्ञ से संपर्क करें।'
                  : 'Safety Notice: I\'m an AI assistant. For serious issues, please consult with an expert.'
                }
              </p>
            </div>
          </div>
        </Card>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Avatar className="h-8 w-8">
                  {message.type === 'user' ? (
                    <User className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Bot className="h-5 w-5 text-primary" />
                  )}
                </Avatar>
                <Card className={`p-3 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/50'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.type === 'bot' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSpeaking}
                        className="p-1 h-6 w-6"
                      >
                        {isSpeaking ? (
                          <VolumeX className="h-3 w-3" />
                        ) : (
                          <Volume2 className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80 p-2"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {language === 'hi' ? suggestion.hi : suggestion.en}
              </Badge>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={language === 'hi' 
                  ? 'अपनी समस्या बताएं...' 
                  : 'Tell me what\'s happening in your field...'}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleRecording}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 h-8 w-8 ${
                  isRecording ? 'text-destructive animate-pulse' : ''
                }`}
              >
                {isRecording ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatBot;