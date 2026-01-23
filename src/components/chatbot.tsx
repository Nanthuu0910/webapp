'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/firebase';
import { askTutor } from '@/app/actions';
import { Loader2, Send, User, Bot } from 'lucide-react';

interface Message {
  id: string; // Unique ID for React key
  role: 'user' | 'model';
  content: string;
}

interface ChatbotProps {
  tutor: string;
}

export function Chatbot({ tutor }: ChatbotProps) {
  const { user } = useUser();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Clear chat history when the tutor subject changes
  React.useEffect(() => {
    setMessages([]);
  }, [tutor]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessageContent = input;
    setInput('');

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessageContent,
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    const historyForAI = newMessages.map(({ role, content }) => ({
      role,
      content,
    }));

    const result = await askTutor(tutor, {
      history: historyForAI,
      question: userMessageContent,
    });
    
    setIsLoading(false);

    if (result.success && result.answer) {
      const modelMessage: Message = {
        id: Date.now().toString() + '-model',
        role: 'model',
        content: result.answer,
      };
      setMessages((prev) => [...prev, modelMessage]);
    } else {
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        role: 'model',
        content: result.error || 'An unexpected error occurred.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const tutorName = tutor.charAt(0).toUpperCase() + tutor.slice(1);

  return (
    <Card className="w-full max-w-3xl mx-auto flex flex-col h-[calc(100vh-10rem)] my-4">
      <CardHeader>
        <CardTitle>{tutorName} Tutor</CardTitle>
        <CardDescription>Ask me anything about {tutorName}.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-4 space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'model' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.photoURL || undefined} />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full text-muted-foreground">
              No messages yet. Start the conversation!
            </div>
          )}
          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>
                  <Bot />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-lg px-4 py-2 max-w-[80%] bg-muted flex items-center">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 pt-4 border-t"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about ${tutor}...`}
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
