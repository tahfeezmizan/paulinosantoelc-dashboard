"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

// Types for our chat messages
interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: string;
  date: string;
}

export default function Page({ params }: any) {
  // console.log("User Id", { params });

  const [inputValue, setInputValue] = useState("");

  // State for chat messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello, I want to make enquiries about your product",
      sender: "user",
      timestamp: "12:55 am",
      date: "20 January 2025",
    },
    {
      id: "2",
      content: "Hello Janet, thank you for reaching out",
      sender: "agent",
      timestamp: "12:57 am",
      date: "20 January 2025",
    },
    {
      id: "3",
      content: "What do you need to know?",
      sender: "agent",
      timestamp: "12:57 am",
      date: "20 January 2025",
    },
    {
      id: "4",
      content:
        "I want to know if the price is negotiable, i need about 2 Units",
      sender: "user",
      timestamp: "12:55 am",
      date: "Today",
    },
    {
      id: "5",
      content:
        "I want to know if the price is negotiable, i need about 2 Units",
      sender: "user",
      timestamp: "12:55 am",
      date: "Today",
    },
  ]);

  // Reference to the messages container for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim()) {
      // Log the input value to console as requested
      // console.log("Message submitted:", inputValue);

      // Create a new message
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputValue,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        date: "Today",
      };

      // Add the new message to the chat
      setMessages([...messages, newMessage]);

      // Clear the input field
      setInputValue("");
    }
  };

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  messages.forEach((message) => {
    if (!groupedMessages[message.date]) {
      groupedMessages[message.date] = [];
    }
    groupedMessages[message.date].push(message);
  });

  return (
    <div className="flex flex-col bg-white overflow-hidden rounded-2xl h-full">
      {/* Header */}
      <div className="p-4 bg-white border-b flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <img src="/placeholder.svg?height=40&width=40" alt="Jane Doe" />
        </Avatar>
        <div>
          <h3 className="font-medium">Jane Doe</h3>
          <div className="flex items-center text-sm text-gray-500">
            <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
            <span>Online</span>
            <span className="ml-2">12:55 am</span>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div
        className="flex-1 overflow-y-auto p-4 flex flex-col justify-end bg-gray-50"
        ref={messagesEndRef}
      >
        <div className="space-y-4">
          {Object.keys(groupedMessages).map((date) => (
            <div key={date}>
              {/* Date separator */}
              <div className="flex justify-center my-4">
                <div className="bg-gray-100 text-gray-600 text-sm px-4 py-1 rounded-full">
                  {date}
                </div>
              </div>

              {/* Messages for this date */}
              {groupedMessages[date].map((message) => (
                <div key={message.id} className="space-y-1">
                  <div
                    className={`flex ${
                      message.sender === "agent"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === "agent"
                          ? "bg-white text-gray-800 rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                  <div
                    className={`text-xs text-gray-500 ${
                      message.sender === "agent" ? "text-right" : "text-left"
                    }`}
                  >
                    {message.timestamp}
                    {message.sender === "agent" && (
                      <span className="inline-block ml-1 text-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="inline"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSubmit} className="p-3 border-t flex items-center">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="rounded-full h-10 w-10 text-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14"></path>
          </svg>
        </Button>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Your message"
          className="flex-1 mx-2 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          className="rounded-md bg-blue-500 hover:bg-blue-600 text-white"
        >
          Send <Send className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
