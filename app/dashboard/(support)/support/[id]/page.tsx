/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useChat } from "@/hooks/use-chat";
import { useGetAllUserQuery } from "@/redux/api/userApi";
import { User } from "@/types/common";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import userImage from "@/public/chat-person.png";
import { Send } from "lucide-react";

export default function Page({ params }: { params: { id: string } }) {
  const { data } = useGetAllUserQuery({});
  const users = data?.data?.users;
  const currentUserId = users?.id;
  const otherUserId = params.id;
  const [message, setMessage] = useState("");

  const singleUsers = users?.find((user: User) => user.id === otherUserId);

  // console.log(singleUsers);

  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, typingStatus, sendMessage, setTyping, markAsRead } =
    useChat();

  // console.log("Interface", sendMessage);

  // Scroll to bottom when messages change

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    // Mark messages as read when they're displayed

    messages.forEach((msg) => {
      if (msg.receiverId === currentUserId && !msg.isRead) {
        markAsRead(msg.id, msg.chatroomId);
      }

      // console.log(message);
    });
  }, [messages]);

  // console.log("send from my side", message);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(otherUserId, message, (response) => {
        if (response.status === "success") {
          setMessage("");

          setTyping(getRoomId(users.id, otherUserId), false);
        }
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSendMessage();
    }
  };

  const getRoomId = (user1: string, user2: string) => {
    return [user1, user2].sort().join("-");
  };

  return (
    <div className="flex flex-col h-full px-6 bg-white p-6 rounded-2xl">
      <div className=" flex items-center gap-5 p-2 border-b pb-4">
        <Image
          src={singleUsers?.companyInfo?.logo || userImage}
          alt={`${singleUsers?.logo} logo`}
          className="object-cover w-14 h-14 rounded-md transition duration-300 ease-in-out hover:scale-105"
          width={50}
          height={50}
          priority
        />
        <div className="">
          <h1 className="text-xl font-medium">
            {singleUsers?.firstName} {singleUsers?.lastName} -{" "}
          </h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </div>
            <p className="text-md text-gray-500">8:31 PM</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg?.id}
            className={`mb-4 ${
              msg.senderId === currentUserId ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.senderId === currentUserId
                  ? "bg-[#E6F6FD] text-black"
                  : "bg-gray-200"
              }`}
            >
              {msg.content}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(msg.createdAt).toLocaleTimeString()}
              {msg.isRead && " ✓✓"}
            </div>
          </div>
        ))}
        {typingStatus?.isTyping && typingStatus.userId === otherUserId && (
          <div className="text-left mb-4">
            <div className="inline-block p-3 rounded-lg bg-gray-200">
              {" "}
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex p-4  items-center justify-between gap-4">
        <div className=" w-full">
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (e.target.value) {
                if (!isTyping) {
                  setTyping(getRoomId(currentUserId, otherUserId), true);
                  setIsTyping(true);
                }
              } else {
                setTyping(getRoomId(currentUserId, otherUserId), false);
                setIsTyping(false);
              }
            }}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setTyping(getRoomId(currentUserId, otherUserId), false);
              setIsTyping(false);
            }}
            className="w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 px-4 py-3 rounded-md text-sm placeholder-gray-500 transition-all duration-200"
            placeholder="Your Message"
            rows={1}
            style={{
              minHeight: "44px",
              maxHeight: "120px",
            }}
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className="px-6 py-3 bg-[#00A9EA] text-white rounded-md hover:bg-[#00A9EA] transition-all duration-200 font-medium text-sm min-w-[80px] flex items-center justify-center gap-2"
        >
          Send
          <Send />
        </button>
      </div>
    </div>
  );
}
